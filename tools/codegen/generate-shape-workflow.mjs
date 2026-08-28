#!/usr/bin/env node
/**
 * Generator BENTUK WORKFLOW/APPEND-ONLY — modul dengan verb custom (transisi
 * status/aksi eksplisit) dan/atau TIDAK full CRUD (tanpa update dan/atau
 * destroy di backend), sengaja dilewati generate-shape1.mjs (lihat
 * isEligibleForDialog di sana). Sebelum ini modul-modul ini masih pakai
 * template lama (kolom mentah, Ubah link ke FormPage terpisah, tanpa
 * Hapus/aksi apa pun). Cetak src/features/<Modul>/{types.ts,api.ts,
 * pages/ListPage.tsx} berbasis WorkflowListPage (src/shared/components/
 * WorkflowListPage.tsx) — SATU file per modul seperti generate-shape1.mjs,
 * tapi tombol Tambah/Ubah/Hapus MUNCUL KONDISIONAL sesuai kapabilitas
 * backend nyata (bukan selalu ada seperti CrudDialogPage), dan tiap verb
 * custom di backend dapat tombol aksi sendiri (confirm AlertDialog, atau
 * Dialog+field kalau verb itu butuh payload — dideteksi dari
 * requestFields/inlineFields hasil extract-metadata.mjs).
 *
 * TIDAK PERNAH menimpa modul yang sudah dikonversi ke CrudDialogPage (391
 * modul bentuk-1) atau yang sudah ditulis tangan (renderExtra/nested list) -
 * lihat looksHandCustomized/looksAlreadyDialog.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const CATALOG_PATH = path.resolve(here, 'output/modules-catalog.json')
const FEATURES_ROOT = path.resolve(here, '../../src/features')
const MANUAL_TSX_PATH = path.resolve(here, '../../src/routes/manual.tsx')

const catalog = JSON.parse(readFileSync(CATALOG_PATH, 'utf8'))

const manualModules = existsSync(MANUAL_TSX_PATH)
  ? new Set([...readFileSync(MANUAL_TSX_PATH, 'utf8').matchAll(/module: '([^']+)'/g)].map((m) => m[1]))
  : new Set()

const TABLE_TO_ENDPOINT = new Map()
for (const entry of catalog) {
  if (entry.tableName && entry.route.apiResources?.length > 0) {
    TABLE_TO_ENDPOINT.set(entry.tableName, `/${entry.route.apiResources[0].uri}`)
  }
}

const LARGE_TABLES = new Set([
  'patients', 'employees', 'visits', 'services', 'registrations',
  'invoices', 'invoice_items', 'prescriptions', 'prescription_items',
  'drugs', 'medication_stocks', 'bed_occupancies',
  'lab_orders', 'radiology_orders', 'users',
])

function toPascalCase(str) {
  return str.replace(/(^\w|_\w)/g, (m) => m.replace('_', '').toUpperCase())
}
function toCamelCase(str) {
  const p = toPascalCase(str)
  return p.charAt(0).toLowerCase() + p.slice(1)
}
function toKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}
function humanizeEnumValue(val) {
  return val.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
function isEnumField(field) {
  return field.enumValues && field.enumValues.length >= 2 && field.enumValues.every((v) => v !== '')
}
function tsType(field) {
  if (field.type === 'boolean') return 'boolean'
  if (field.type === 'number' || field.type === 'relation') return 'number'
  return 'string'
}
function pluralizeGuess(word) {
  if (/(s|ss|sh|ch|x|z)$/.test(word)) return `${word}es`
  if (/[^aeiou]y$/.test(word)) return `${word.slice(0, -1)}ies`
  return `${word}s`
}
function relationEndpoint(field) {
  if (field.relation) return TABLE_TO_ENDPOINT.get(field.relation.table) ?? null
  if (field.type === 'number' && field.name.endsWith('_id')) {
    const guess = pluralizeGuess(field.name.slice(0, -3))
    return TABLE_TO_ENDPOINT.get(guess) ?? null
  }
  return null
}
function isVillageField(f) {
  return f.type === 'relation' && f.relation?.table === 'indonesia_villages'
}
function isLargeFk(f) {
  return Boolean(f.relation && LARGE_TABLES.has(f.relation.table))
}

function fieldToCrudField(f) {
  const base = { key: f.name, required: f.required }
  if (isVillageField(f)) {
    return {
      ...base,
      type: 'custom',
      renderImport: 'RegionVillagePicker',
      renderExpr: `(value, onChange) => (\n      <RegionVillagePicker value={(value as number) ?? null} onChange={(v) => onChange(v)} />\n    )`,
    }
  }
  const endpoint = relationEndpoint(f)
  if (endpoint && !isLargeFk(f)) return { ...base, type: 'relation', relationEndpoint: endpoint }
  if (f.type === 'relation' && (isLargeFk(f) || !endpoint)) return { ...base, type: 'number' }
  if (f.type === 'boolean') return { ...base, type: 'checkbox' }
  if (f.type === 'date') return { ...base, type: 'date' }
  if (isEnumField(f)) {
    return { ...base, type: 'select', options: f.enumValues.map((v) => ({ value: v, label: humanizeEnumValue(v) })) }
  }
  if (f.type === 'number') return { ...base, type: 'number' }
  return { ...base }
}

function pickStoreFields(entry) {
  const reqKeys = Object.keys(entry.requestFields)
  const storeKey = reqKeys.find((k) => /^Store/i.test(k)) ?? null
  if (storeKey && entry.requestFields[storeKey].length > 0) return entry.requestFields[storeKey]
  const inlineKeys = Object.keys(entry.inlineFields)
  const storeInline = inlineKeys.find((k) => k.endsWith('::store'))
  if (storeInline && entry.inlineFields[storeInline].length > 0) return entry.inlineFields[storeInline]
  if (storeKey) return entry.requestFields[storeKey]
  // Fallback terakhir: request/inline pertama yang ada (modul tanpa nama kelas standar Store*).
  if (reqKeys.length > 0 && entry.requestFields[reqKeys[0]].length > 0) return entry.requestFields[reqKeys[0]]
  if (inlineKeys.length > 0) return entry.inlineFields[inlineKeys[0]]
  return null
}

function pickResourceColumns(entry, fallbackFields) {
  const resKeys = Object.keys(entry.resourceFields)
  if (resKeys.length > 0) return entry.resourceFields[resKeys[0]]
  return ['id', ...fallbackFields.map((f) => f.name)]
}

function guessItemLabelField(fields) {
  const preferred = ['name', 'title', 'code', 'label', 'order_number', 'request_number']
  for (const p of preferred) {
    if (fields.some((f) => f.name === p)) return p
  }
  const firstText = fields.find((f) => f.type === 'string' && !f.relation)
  return firstText?.name ?? null
}

/** Resource entry (dari beberapa Route::apiResource yang mungkin di-split index/show vs store/update) yang punya kapabilitas store — dipakai sebagai URI utama modul. */
function pickPrimaryResource(entry) {
  const resources = entry.route.apiResources ?? []
  return resources.find((r) => (r.chain ?? '').includes("'store'") || (r.chain ?? '') === '') ?? resources[0]
}

function capabilitiesOf(entry) {
  const chains = (entry.route.apiResources ?? []).map((r) => r.chain ?? '')
  const hasUpdate = chains.some((c) => c.includes("'update'") || c === '')
  const hasDestroy = chains.some((c) => c.includes("'destroy'") || c === '')
  const hasStore = chains.some((c) => c.includes("'store'") || c === '')
  return { canCreate: hasStore, canUpdate: hasUpdate, canDestroy: hasDestroy }
}

/** Eligible: modul CRUD-ish (punya apiResource + field store) yang BUKAN kandidat CrudDialogPage bentuk-1 (lihat generate-shape1.mjs::isEligibleForDialog) — supaya dua generator saling melengkapi tanpa tumpang tindih. */
function isEligibleWorkflow(entry) {
  const apiResources = entry.route.apiResources ?? []
  if (apiResources.length === 0) return false
  const fields = pickStoreFields(entry)
  if (!fields || fields.length === 0) return false
  const caps = capabilitiesOf(entry)
  const workflowVerbs = (entry.route.verbs ?? []).filter(
    (v) => (v.verb === 'post' || v.verb === 'patch') && !['store', 'update', 'destroy'].includes(v.verb),
  )
  const isDialogEligible = caps.canUpdate && caps.canDestroy && workflowVerbs.length === 0
  return !isDialogEligible
}

function looksHandCustomized(filePath) {
  if (!existsSync(filePath)) return false
  const src = readFileSync(filePath, 'utf8')
  return src.includes('renderExtra') || src.includes('InlineNestedList') || src.includes('CrudListPage')
}
function looksAlreadyGeneratedShape1(filePath) {
  if (!existsSync(filePath)) return false
  return readFileSync(filePath, 'utf8').includes("from '@/shared/components/CrudDialogPage'")
}
function looksAlreadyApiConsoleOrReadonly(filePath) {
  if (!existsSync(filePath)) return false
  const src = readFileSync(filePath, 'utf8')
  return src.includes('ApiConsole')
}

const ACTION_WORD_LABELS = {
  reserve: 'Pesan', 'release-reservation': 'Lepas Reservasi', release: 'Lepas',
  complete: 'Selesaikan', cancel: 'Batalkan', close: 'Tutup', start: 'Mulai',
  verify: 'Verifikasi', lock: 'Kunci', unlock: 'Buka Kunci', assign: 'Tugaskan',
  'assign-courier': 'Tugaskan Kurir', 'mark-delivered': 'Tandai Terkirim',
  investigate: 'Investigasi', rca: 'RCA', discharge: 'Pulangkan', transfer: 'Pindahkan',
  schedule: 'Jadwalkan', dispense: 'Serahkan', 'send-to-analyzer': 'Kirim ke Analyzer',
  result: 'Input Hasil', crossmatch: 'Crossmatch', transfuse: 'Transfusikan',
  'adjust-stock': 'Sesuaikan Stok', status: 'Ubah Status',
}

function humanizeActionSegment(segment) {
  if (ACTION_WORD_LABELS[segment]) return ACTION_WORD_LABELS[segment]
  return segment
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

const DESTRUCTIVE_WORDS = /cancel|close|release|reject|discharge|batal/i

/** Cari field payload untuk verb aksi via requestFields (nama kelas FormRequest mengandung kata aksi) atau inlineFields (key persis Controller::methodCamelCase). */
function findActionFields(entry, actionSegment) {
  const camel = toCamelCase(actionSegment.replace(/-/g, '_'))
  const inlineKeys = Object.keys(entry.inlineFields)
  const exactInline = inlineKeys.find((k) => k.split('::')[1] === camel)
  if (exactInline && entry.inlineFields[exactInline].length > 0) return entry.inlineFields[exactInline]

  const words = actionSegment.split('-').filter((w) => w.length >= 4)
  if (words.length > 0) {
    const reqKeys = Object.keys(entry.requestFields)
    const fuzzyReq = reqKeys.find((k) => {
      if (/^Store|^Update/i.test(k)) return false
      const lower = k.toLowerCase()
      return words.every((w) => lower.includes(w))
    })
    if (fuzzyReq && entry.requestFields[fuzzyReq].length > 0) return entry.requestFields[fuzzyReq]
  }
  return null
}

function buildActions(entry, primaryUri) {
  const verbs = entry.route.verbs ?? []
  const actions = []
  for (const v of verbs) {
    if (v.verb !== 'post' && v.verb !== 'patch' && v.verb !== 'put') continue
    if (!v.uri.startsWith(`${primaryUri}/`)) continue // verb milik resource lain dalam modul yang sama (mis. sub-resource trips di modul fleet) - jangan ditempel ke baris salah.
    const withoutPrefix = v.uri.slice(primaryUri.length + 1)
    const segments = withoutPrefix.split('/')
    const idPlaceholder = segments[0]
    if (!idPlaceholder.startsWith('{')) continue // bukan pola resource/{id}/aksi
    const actionSegment = segments.slice(1).join('-')
    if (!actionSegment) continue
    const key = actionSegment
    const label = humanizeActionSegment(actionSegment)
    const actionFields = findActionFields(entry, actionSegment)
    const pathTemplate = `/${v.uri.replace(/\{[^}]+\}/g, () => '${item.id}')}`
    actions.push({
      key,
      label,
      method: v.verb,
      pathTemplate,
      fields: actionFields,
      variant: DESTRUCTIVE_WORDS.test(actionSegment) ? 'destructive' : 'default',
    })
  }
  return actions
}

// Aksi tidak memakai RegionVillagePicker (field cascading wilayah) - payload
// aksi workflow selalu field datar (relasi/angka/teks), jadi custom render
// tidak relevan di sini; helper ini cuma memastikan properti renderImport
// (kalau ada) tidak ikut disisipkan ke actionFields (tidak dipakai action-dialog).
function fieldToCrudFieldStripRenderImport(f) {
  const cf = fieldToCrudField(f)
  const { renderImport, renderExpr, ...rest } = cf
  return rest
}

function generateModule(entry) {
  const fields = pickStoreFields(entry)
  const resourceColumns = pickResourceColumns(entry, fields)
  const primary = pickPrimaryResource(entry)
  const uri = primary.uri
  const entity = toPascalCase(primary.controller.replace(/Controller$/, ''))
  const dir = path.join(FEATURES_ROOT, entry.module)
  const listPagePath = path.join(dir, 'pages/ListPage.tsx')
  const formPagePath = path.join(dir, 'pages/FormPage.tsx')

  if (looksHandCustomized(listPagePath)) return 'hand-customized'
  if (looksAlreadyGeneratedShape1(listPagePath)) return 'already-shape1'
  if (looksAlreadyApiConsoleOrReadonly(listPagePath)) return 'already-other-shape'

  mkdirSync(path.join(dir, 'pages'), { recursive: true })

  const caps = capabilitiesOf(entry)
  const actions = buildActions(entry, uri)

  const fieldByName = new Map(fields.map((f) => [f.name, f]))

  const typeFields = fields.map((f) => `  ${f.name}${f.nullable ? '?' : ''}: ${tsType(f)} | null`).join('\n')
  const typesTs = `export interface ${entity} {
  id: number
${typeFields}
  created_at?: string
  updated_at?: string
}

export interface ${entity}FormValues {
${fields.map((f) => `  ${f.name}?: ${tsType(f)} | null`).join('\n')}
}
`

  const apiTs = `import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ${entity} } from './types'

export const ${toPascalCase(entry.module)}Endpoint = '/${uri}'

export function use${entity}Resource() {
  return useCrudResource<${entity}>(${toPascalCase(entry.module)}Endpoint)
}
`

  const EXCLUDE_COLUMNS = new Set(['id', 'created_at', 'updated_at', 'password', 'remember_token'])
  const displayColumns = resourceColumns.filter((c) => !EXCLUDE_COLUMNS.has(c)).slice(0, 6)
  const isResolvableRelation = (f) => Boolean(f && relationEndpoint(f) && !isLargeFk(f))
  const relationImportNeeded = displayColumns.some((c) => isResolvableRelation(fieldByName.get(c)))

  const columnDefs = displayColumns
    .map((c) => {
      const f = fieldByName.get(c)
      if (isResolvableRelation(f)) {
        return `  {
    header: humanizeField('${c}'),
    cell: ({ row }) => <RelationLabel endpoint="${relationEndpoint(f)}" id={(row.original as unknown as Record<string, unknown>).${c} as number | null} />,
  },`
      }
      if (c === 'status') {
        return `  {
    header: humanizeField('${c}'),
    cell: ({ row }) => {
      const v = (row.original as unknown as Record<string, unknown>).${c}
      return v ? <Badge variant="outline">{String(v)}</Badge> : '—'
    },
  },`
      }
      if (f && f.type === 'boolean') {
        return `  {
    header: humanizeField('${c}'),
    cell: ({ row }) => ((row.original as unknown as Record<string, unknown>).${c} ? 'Ya' : 'Tidak'),
  },`
      }
      return `  {
    header: humanizeField('${c}'),
    accessorKey: '${c}',
    cell: ({ row }) => String((row.original as unknown as Record<string, unknown>).${c} ?? '—'),
  },`
    })
    .join('\n')

  const useSections = fields.length > 10
  const midpoint = Math.ceil(fields.length / 2)
  const customImports = new Set()

  function fieldEntriesFor(fieldList, sectioned) {
    return fieldList.map((f, i) => {
      const cf = fieldToCrudField(f)
      if (cf.renderImport) customImports.add(cf.renderImport)
      const parts = [`key: '${f.name}'`, `label: humanizeField('${f.name}')`]
      if (cf.type && cf.type !== 'text') parts.push(`type: '${cf.type}'`)
      if (cf.relationEndpoint) parts.push(`relationEndpoint: '${cf.relationEndpoint}'`)
      if (cf.required) parts.push(`required: true`)
      if (cf.options) parts.push(`options: ${JSON.stringify(cf.options)}`)
      if (cf.renderExpr) parts.push(`render: ${cf.renderExpr}`)
      if (sectioned) parts.push(`section: ${i < Math.ceil(fieldList.length / 2) ? "'Detail'" : "'Detail Tambahan'"}`)
      return `  { ${parts.join(', ')} },`
    })
  }

  const crudFieldEntries = fieldEntriesFor(fields, useSections)

  function emptyFormFor(fieldList) {
    return fieldList
      .map((f) => {
        const cf = fieldToCrudField(f)
        const defaultVal = cf.type === 'checkbox' ? 'false' : cf.type === 'relation' || cf.type === 'custom' ? 'null' : "''"
        return `  ${f.name}: ${defaultVal},`
      })
      .join('\n')
  }

  const emptyFormEntries = emptyFormFor(fields)
  const itemLabelField = guessItemLabelField(fields)

  // --- Aksi workflow: tiap aksi jadi entri WorkflowAction, dengan field dialog kalau ada payload.
  let actionsCode = 'const actions: WorkflowAction<' + entity + '>[] = []\n'
  if (actions.length > 0) {
    const actionBlocks = actions.map((a) => {
      const lines = [`  {`, `    key: '${a.key}',`, `    label: '${a.label.replace(/'/g, "\\'")}',`, `    method: '${a.method}',`, `    path: (item) => \`${a.pathTemplate}\`,`]
      if (a.variant === 'destructive') lines.push(`    variant: 'destructive',`)
      if (a.fields && a.fields.length > 0) {
        const fEntries = fieldEntriesFor(a.fields, false)
        lines.push(`    fields: [\n${fEntries.map((l) => '      ' + l).join('\n')}\n    ],`)
        lines.push(`    emptyForm: {\n${emptyFormFor(a.fields).split('\n').map((l) => '      ' + l).join('\n')}\n    },`)
      }
      lines.push(`  },`)
      return lines.join('\n')
    })
    actionsCode = `const actions: WorkflowAction<${entity}>[] = [\n${actionBlocks.join('\n')}\n]\n`
  }

  const imports = [
    `import type { ColumnDef } from '@tanstack/react-table'`,
    displayColumns.includes('status') ? `import { Badge } from '@/components/ui/badge'` : null,
    `import { WorkflowListPage, type WorkflowAction, type CrudField } from '@/shared/components/WorkflowListPage'`,
    customImports.has('RegionVillagePicker') ? `import { RegionVillagePicker } from '@/shared/components/RegionVillagePicker'` : null,
    relationImportNeeded ? `import { RelationLabel } from '@/shared/components/RelationLabel'` : null,
    `import { humanizeField, humanizeModuleName } from '@/shared/labels'`,
    `import { ${toPascalCase(entry.module)}Endpoint, use${entity}Resource } from '../api'`,
    `import type { ${entity} } from '../types'`,
  ].filter(Boolean)

  const listPageTsx = `${imports.join('\n')}

const columns: ColumnDef<${entity}, unknown>[] = [
${columnDefs}
]

const fields: CrudField[] = [
${crudFieldEntries.join('\n')}
]

const emptyForm = {
${emptyFormEntries}
}

${actionsCode}
export function ${entity}ListPage() {
  const resource = use${entity}Resource()
  const title = humanizeModuleName('${entry.module}')

  return (
    <WorkflowListPage<${entity}>
      title={title}
      description={\`Kelola data \${title.toLowerCase()}.\`}
      endpoint={${toPascalCase(entry.module)}Endpoint}
      columns={columns}
      capabilities={{ canCreate: ${caps.canCreate}, canUpdate: ${caps.canUpdate}, canDestroy: ${caps.canDestroy} }}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => ${itemLabelField ? `item.${itemLabelField} ?? \`#\${item.id}\`` : `\`#\${item.id}\``}}
      actions={actions}
      resource={resource}
    />
  )
}
`

  writeFileSync(path.join(dir, 'types.ts'), typesTs)
  writeFileSync(path.join(dir, 'api.ts'), apiTs)
  writeFileSync(listPagePath, listPageTsx)
  if (existsSync(formPagePath)) rmSync(formPagePath)
  return 'generated'
}

function main() {
  const targetArg = process.argv[2]
  const targets = targetArg ? targetArg.split(',') : null

  const eligible = catalog.filter((e) => isEligibleWorkflow(e) && !manualModules.has(e.module))
  const toGenerate = targets ? eligible.filter((e) => targets.includes(e.module)) : eligible

  let generated = 0, handCustomized = 0, alreadyShape1 = 0, alreadyOther = 0, failed = 0
  for (const entry of toGenerate) {
    try {
      const result = generateModule(entry)
      if (result === 'generated') generated++
      else if (result === 'hand-customized') handCustomized++
      else if (result === 'already-shape1') alreadyShape1++
      else if (result === 'already-other-shape') alreadyOther++
    } catch (err) {
      failed++
      console.error(`GAGAL ${entry.module}:`, err.message)
    }
  }
  console.log(
    `Digenerate: ${generated} modul workflow/append-only. Dilewati: ${handCustomized} (di-tangan), ${alreadyShape1} (sudah CrudDialogPage), ${alreadyOther} (ApiConsole/readonly). Gagal: ${failed}. (dari ${eligible.length} kandidat, ${catalog.length} total modul)`,
  )
}

main()
