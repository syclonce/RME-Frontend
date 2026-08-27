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

function extractResourceFields(moduleDir) {
  const files = findFiles(path.join(moduleDir, 'app/Http/Resources'), (n) => n.endsWith('.php'))
  const byFile = {}
  for (const f of files) {
    const src = readIfExists(f)
    if (!src) continue
    const bodyMatch = src.match(/function\s+toArray\s*\([^)]*\)\s*:\s*array\s*\{([\s\S]*?)\n\s{4}\}/)
    if (!bodyMatch) continue
    const keys = [...bodyMatch[1].matchAll(/'([a-zA-Z0-9_]+)'\s*=>/g)].map((x) => x[1])
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

function extractRouteInfo(moduleDir) {
  const src = readIfExists(path.join(moduleDir, 'routes/api.php'))
  if (!src) return { hasApiResource: false, verbs: [], uris: [] }
  const apiResourceCalls = [...src.matchAll(/Route::apiResource\('([^']+)'\s*,\s*(\w+)::class\)([^;]*);/g)]
  const verbCalls = [...src.matchAll(/Route::(get|post|put|patch|delete)\(\s*'([^']+)'/g)]
  return {
    apiResources: apiResourceCalls.map((m) => ({ uri: m[1], controller: m[2], chain: m[3].trim() })),
    verbs: verbCalls.map((m) => ({ verb: m[1], uri: m[2] })),
  }
}

function main() {
  const moduleNames = listDirs(BACKEND_ROOT).sort()
  const catalog = []
  for (const name of moduleNames) {
    const moduleDir = path.join(BACKEND_ROOT, name)
    const requestFields = extractFieldsFromRequests(moduleDir)
    const inlineFields = extractInlineValidate(moduleDir)
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
