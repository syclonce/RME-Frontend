#!/usr/bin/env node
/**
 * Ekstrak metadata field per modul dari RME-Backend TANPA LLM — murni regex
 * atas array rules() Laravel (baik di class FormRequest maupun inline
 * $request->validate([...]) di controller). Laravel validation rules cukup
 * terstruktur untuk diparse deterministik: 'field' => ['rule', 'rule', ...].
 *
 * Output: tools/codegen/output/modules-catalog.json — satu entri per modul
 * backend, dipakai generator (belum ditulis) untuk mencetak fitur React.
 */
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const BACKEND_ROOT = path.resolve(here, '../../../RME-Backend/Modules')
const OUT_DIR = path.resolve(here, 'output')

function listDirs(p) {
  return readdirSync(p).filter((name) => statSync(path.join(p, name)).isDirectory())
}

function readIfExists(p) {
  try {
    return readFileSync(p, 'utf8')
  } catch {
    return null
  }
}

function findFiles(dir, matcher) {
  let out = []
  let entries
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) out = out.concat(findFiles(full, matcher))
    else if (matcher(e.name)) out.push(full)
  }
  return out
}

/** Parse satu blok array rules 'field' => ['rule', ...] atau 'field' => 'rule|rule' */
function parseRulesBlock(src) {
  const fields = []
  // Cocokkan 'nama_field' => [ ...isi tanpa kurung siku nested... ]  ATAU  'nama_field' => 'string|rules'
  const re = /'([a-zA-Z0-9_]+)'\s*=>\s*(\[[^\]]*\]|'[^']*')/g
  let m
  while ((m = re.exec(src)) !== null) {
    const [, fieldName, rawRule] = m
    let ruleText = rawRule
    if (rawRule.startsWith('[')) {
      // ambil tiap 'xxx' di dalam array, gabung dengan |
      const inner = [...rawRule.matchAll(/'([^']*)'/g)].map((x) => x[1])
      ruleText = inner.join('|')
    } else {
      ruleText = rawRule.slice(1, -1)
    }
    fields.push(classifyField(fieldName, ruleText))
  }
  return fields
}

function classifyField(name, ruleText) {
  const rules = ruleText.split('|').map((r) => r.trim()).filter(Boolean)
  const required = rules.some((r) => r === 'required')
  const nullable = rules.some((r) => r === 'nullable') || rules.some((r) => r === 'sometimes')
  let type = 'string'
  if (rules.some((r) => r === 'boolean')) type = 'boolean'
  else if (rules.some((r) => r === 'integer' || r === 'numeric')) type = 'number'
  else if (rules.some((r) => r === 'date' || r.startsWith('date_format'))) type = 'date'
  else if (rules.some((r) => r === 'array')) type = 'array'
  else if (rules.some((r) => r === 'string')) type = 'string'

  const existsRule = rules.find((r) => r.startsWith('exists:'))
  let relation = null
  if (existsRule) {
    const [, tableCol] = existsRule.split(':')
    const [table, column] = tableCol.split(',')
    relation = { table, column: column || 'id' }
    type = 'relation'
  }

  const enumRule = rules.find((r) => r.startsWith('in:'))
  const enumValues = enumRule ? enumRule.slice(3).split(',') : null

  const maxRule = rules.find((r) => r.startsWith('max:'))
  const max = maxRule ? Number(maxRule.slice(4)) : null

  return { name, type, required, nullable, relation, enumValues, max }
}

function extractFieldsFromRequests(moduleDir) {
  const files = findFiles(path.join(moduleDir, 'app/Http/Requests'), (n) => n.endsWith('.php'))
  const byFile = {}
  for (const f of files) {
    const src = readIfExists(f)
    if (!src) continue
    const rulesMatch = src.match(/function\s+rules\s*\([^)]*\)\s*:\s*array\s*\{([\s\S]*?)\n\s{4}\}/)
    if (!rulesMatch) continue
    byFile[path.basename(f, '.php')] = parseRulesBlock(rulesMatch[1])
  }
  return byFile
}

function extractInlineValidate(moduleDir) {
  const files = findFiles(path.join(moduleDir, 'app/Http/Controllers'), (n) => n.endsWith('.php'))
  const byMethod = {}
  for (const f of files) {
    const src = readIfExists(f)
    if (!src) continue
    const re = /function\s+(store|update)\s*\([^)]*\)[^{]*\{([\s\S]*?)validate\(\s*\[([\s\S]*?)\]\s*\)/g
    let m
    while ((m = re.exec(src)) !== null) {
      const [, method, , rulesBody] = m
      byMethod[`${path.basename(f, '.php')}::${method}`] = parseRulesBlock(rulesBody)
    }
  }
  return byMethod
}

function extractControllerRulesMethod(moduleDir) {
  const files = findFiles(path.join(moduleDir, 'app/Http/Controllers'), (n) => n.endsWith('.php'))
  const byKey = {}
  for (const f of files) {
    const src = readIfExists(f)
    if (!src) continue
    const m = src.match(/(?:private|protected|public)\s+function\s+rules\s*\([^)]*\)\s*:\s*array\s*\{([\s\S]*?)\n\s{4}\}/)
    if (!m) continue
    byKey[`${path.basename(f, '.php')}::rules`] = parseRulesBlock(m[1])
  }
  return byKey
}

function extractResourceFields(moduleDir) {
  const files = findFiles(path.join(moduleDir, 'app/Http/Resources'), (n) => n.endsWith('.php'))
  const byFile = {}
  for (const f of files) {
    const src = readIfExists(f)
    if (!src) continue
    const bodyMatch = src.match(/function\s+toArray\s*\([^)]*\)\s*:\s*array\s*\{([\s\S]*?)\n\s{4}\}/)
    if (!bodyMatch) continue
    // dedupe: field nested (mis. 'items' => $this->items->map(fn($i) => ['id' => ..., ...]))
    // ikut match regex ini karena tak menelusuri kedalaman kurung, jadi kolom
    // top-level bisa muncul lagi di dalam closure map - hasil harus unik.
    const keys = [...new Set([...bodyMatch[1].matchAll(/'([a-zA-Z0-9_]+)'\s*=>/g)].map((x) => x[1]))]
    byFile[path.basename(f, '.php')] = keys
  }
  return byFile
}

function extractTableName(moduleDir) {
  const files = findFiles(path.join(moduleDir, 'database/migrations'), (n) => n.endsWith('.php'))
  for (const f of files) {
    const src = readIfExists(f)
    if (!src) continue
    const m = src.match(/Schema::create\(\s*'([a-zA-Z0-9_]+)'/)
    if (m) return m[1]
  }
  return null
}

function joinUri(prefixStack, uri) {
  const parts = [...prefixStack, uri.replace(/^\//, '')].filter((p) => p !== '')
  const joined = parts.join('/').replace(/\/+/g, '/')
  // apiClient (frontend) sudah punya baseURL '.../api/v1' - segmen 'v1' di
  // depan URI hasil gabungan prefix akan dobel kalau tidak distrip di sini.
  return joined.replace(/^v1\/?/, '')
}

/**
 * Route::prefix('x')->group(function () { ... }) BISA BERSARANG (mis.
 * SystemLicenseGuard: prefix('v1/system/license') menyelimuti /status,
 * /activate, dst - BpjsAntreanFktp/Rs, BpjsApotek/PCare: prefix('v1')
 * di luar, prefix('pcare-ref')/'referensi'/'mobile-jkn' bersarang di
 * dalam). Regex satu-baris lama TIDAK melacak prefix pembungkus - URI
 * hasil ekstraksi jadi salah (hilang segmen prefix), method konsumen
 * (console/read-only generator) memanggil endpoint yang sungguhan TIDAK
 * ADA. Scan baris-per-baris dgn depth kurung kurawal, lacak stack prefix
 * aktif, tempelkan ke tiap rute yang ditemukan di dalamnya.
 */
function extractRouteInfo(moduleDir) {
  const src = readIfExists(path.join(moduleDir, 'routes/api.php'))
  if (!src) return { apiResources: [], verbs: [] }

  // Lolos 1: bangun snapshot prefix aktif PER BARIS via depth kurung kurawal.
  const lines = src.split('\n')
  let depth = 0
  const stack = [] // { closeBelowDepth, segment }
  const prefixAtLine = []

  for (const line of lines) {
    const opens = (line.match(/\{/g) ?? []).length
    const closes = (line.match(/\}/g) ?? []).length
    const prefixMatch = line.match(/(?:Route::|->)prefix\('([^']+)'\)/)
    const opensGroupHere = /group\(function\s*\(\)\s*\{\s*$/.test(line.trim())

    prefixAtLine.push(stack.map((s) => s.segment))

    if (prefixMatch && opensGroupHere) {
      stack.push({ closeBelowDepth: depth + opens - closes, segment: prefixMatch[1] })
    }
    depth += opens - closes
    while (stack.length && depth < stack[stack.length - 1].closeBelowDepth) stack.pop()
  }

  // Lolos 2: cocokkan ke TEKS PENUH (bukan per baris) - panggilan apiResource
  // kerap menyebar beberapa baris (mis. ->parameters([...]) di baris
  // berikutnya); regex per-baris akan melewatkannya. Petakan posisi match
  // balik ke nomor baris utk ambil prefix yang benar dari lolos 1.
  function lineOf(index) {
    return src.slice(0, index).split('\n').length - 1
  }

  const apiResources = [...src.matchAll(/Route::apiResource\('([^']+)'\s*,\s*(\w+)::class\)([^;]*);/g)].map((m) => ({
    uri: joinUri(prefixAtLine[lineOf(m.index)] ?? [], m[1]),
    controller: m[2],
    chain: m[3].trim(),
  }))
  const verbs = [...src.matchAll(/Route::(get|post|put|patch|delete)\(\s*'([^']+)'/g)].map((m) => ({
    verb: m[1],
    uri: joinUri(prefixAtLine[lineOf(m.index)] ?? [], m[2]),
  }))

  return { apiResources, verbs }
}

function main() {
  const moduleNames = listDirs(BACKEND_ROOT).sort()
  const catalog = []
  for (const name of moduleNames) {
    const moduleDir = path.join(BACKEND_ROOT, name)
    const requestFields = extractFieldsFromRequests(moduleDir)
    const inlineFields = { ...extractInlineValidate(moduleDir), ...extractControllerRulesMethod(moduleDir) }
    const resourceFields = extractResourceFields(moduleDir)
    const routeInfo = extractRouteInfo(moduleDir)
    const tableName = extractTableName(moduleDir)

    const hasRequests = Object.keys(requestFields).length > 0
    const hasInline = Object.keys(inlineFields).length > 0
    const hasResources = Object.keys(resourceFields).length > 0

    catalog.push({
      module: name,
      hasRequests,
      hasInline,
      hasResources,
      requestFields,
      inlineFields,
      resourceFields,
      route: routeInfo,
      tableName,
    })
  }

  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(path.join(OUT_DIR, 'modules-catalog.json'), JSON.stringify(catalog, null, 2))
  console.log(`Selesai. ${catalog.length} modul dianalisis -> tools/codegen/output/modules-catalog.json`)

  const withValidation = catalog.filter((c) => c.hasRequests || c.hasInline).length
  const withApiResource = catalog.filter((c) => c.route.apiResources?.length > 0).length
  console.log(`- ${withValidation} modul punya validasi terdeteksi (Request/inline)`)
  console.log(`- ${withApiResource} modul pakai Route::apiResource`)
}

main()
