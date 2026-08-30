#!/usr/bin/env node
/**
 * Generator BENTUK #1 (CRUD sederhana + picker) — bentuk terbesar dalam
 * taksonomi 10-bentuk (lihat memori rme-frontend-codegen-llm). Baca
 * tools/codegen/output/modules-catalog.json (hasil extract-metadata.mjs,
 * murni deterministik tanpa LLM) lalu cetak src/features/<Modul>/{types.ts,
 * api.ts, pages/ListPage.tsx} untuk modul yang cocok.
 *
 * Sejak rollout pola CrudDialogPage (2026-08-28, disetujui via proof-of-concept
 * GeneralPatient): output SATU file per modul, ListPage.tsx berbasis
 * CrudDialogPage (Tambah/Ubah = shadcn Dialog, Hapus = shadcn AlertDialog,
 * paginasi shadcn Pagination) — TIDAK ADA LAGI FormPage.tsx/route terpisah
 * untuk modul bentuk-1. Lihat src/features/GeneralPatient/pages/ListPage.tsx
 * sebagai contoh acuan (file itu di-tangan, generator tidak menimpanya).
 *
 * HANYA jalankan untuk modul yang benar-benar bentuk #1 (full CRUD — index+
 * store+update+destroy, field flat + relasi sederhana, TANPA verb workflow
 * custom). Modul bentuk lain (append-only/create-only, workflow, nested-list,
 * dst) TIDAK cocok dan dilewati otomatis.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const CATALOG_PATH = path.resolve(here, 'output/modules-catalog.json')
const FEATURES_ROOT = path.resolve(here, '../../src/features')

const catalog = JSON.parse(readFileSync(CATALOG_PATH, 'utf8'))

/** Peta nama tabel DB -> endpoint API, dipakai utk resolve dropdown field relasi. */
const TABLE_TO_ENDPOINT = new Map()
for (const entry of catalog) {
  if (entry.tableName && entry.route.apiResources?.length > 0) {
    TABLE_TO_ENDPOINT.set(entry.tableName, `/${entry.route.apiResources[0].uri}`)
  }
}

/** Tabel yang dianggap "besar" (ratusan-ribuan+ baris) — field FK ke sini
 * pakai AsyncCombobox cari-sambil-ketik (type: 'combobox'), BUKAN
 * RelationSelect dropdown polos yang cuma muat 100 opsi pertama dan bakal
 * terpotong datanya. Lihat fieldToCrudField().
 */
const LARGE_TABLES = new Set([
  'patients', 'employees', 'visits', 'services', 'registrations',
  'invoices', 'invoice_items', 'prescriptions', 'prescription_items',
  'drugs', 'medication_stocks', 'bed_occupancies',
  'lab_orders', 'radiology_orders', 'users',
  'doctors', 'nurses', 'staff_members',
])

function pickStoreFields(entry) {
  const reqKeys = Object.keys(entry.requestFields)
  const storeKey = reqKeys.find((k) => /^Store/i.test(k)) ?? reqKeys[0]
  if (storeKey && entry.requestFields[storeKey].length > 0) return entry.requestFields[storeKey]
  const inlineKeys = Object.keys(entry.inlineFields)
  const storeInline = inlineKeys.find((k) => k.endsWith('::store')) ?? inlineKeys.find((k) => k.endsWith('::rules')) ?? inlineKeys[0]
  if (storeInline && entry.inlineFields[storeInline].length > 0) return entry.inlineFields[storeInline]
  if (storeKey) return entry.requestFields[storeKey]
  return null
}

function pickResourceColumns(entry, fallbackFields) {
  const resKeys = Object.keys(entry.resourceFields)
  if (resKeys.length > 0) return entry.resourceFields[resKeys[0]]
  return ['id', ...fallbackFields.map((f) => f.name)]
}

function toPascalCase(str) {
  return str.replace(/(^\w|_\w)/g, (m) => m.replace('_', '').toUpperCase())
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

function toKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function pluralizeGuess(word) {
  if (/(s|ss|sh|ch|x|z)$/.test(word)) return `${word}es`
  if (/[^aeiou]y$/.test(word)) return `${word.slice(0, -1)}ies`
  return `${word}s`
}

/**
 * Sebagian field FK di RME-Backend TIDAK punya rule `exists:table,id` (gap
 * validasi backend, bukan sesuatu yang bisa diperbaiki dari sisi ekstraktor)
 * - fallback tebak nama tabel dari konvensi penamaan field `xxx_id` -> tabel
 * `xxxs`, dicek balik ke katalog supaya tidak asal tebak endpoint yang tidak
 * ada.
 */
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

function isEligibleShape1(entry) {
  const apiResources = entry.route.apiResources ?? []
  if (apiResources.length === 0) return false
  const fields = pickStoreFields(entry)
  if (!fields || fields.length === 0) return false
  const customVerbs = (entry.route.verbs ?? []).filter(
    (v) => !['index', 'show', 'store', 'update', 'destroy'].includes(v.verb),
  )
  if (customVerbs.length > 3) return false // banyak endpoint aksi = kemungkinan besar bentuk workflow
  return true
}

/**
 * CrudDialogPage butuh update+delete beneran ada di backend (tombol
 * Ubah/Hapus SELALU ditampilkan, tidak kondisional per modul seperti
 * generator lama). Modul create+list-only (append-only) atau yang punya
 * verb transisi status custom (workflow) BUKAN bentuk ini — dilewati, bukan
 * dipaksa pakai UI yang janji Ubah/Hapus padahal backend akan 405.
 */
function isEligibleForDialog(entry) {
  const chains = (entry.route.apiResources ?? []).map((r) => r.chain ?? '')
  const hasUpdate = chains.some((c) => c.includes("'update'") || c === '')
  const hasDestroy = chains.some((c) => c.includes("'destroy'") || c === '')
  const workflowVerbs = (entry.route.verbs ?? []).filter(
    (v) => (v.verb === 'post' || v.verb === 'patch') && !['store', 'update', 'destroy'].includes(v.verb),
  )
  return hasUpdate && hasDestroy && workflowVerbs.length === 0
}

/** Skip file yang sudah di-tangan (mis. GeneralPatient/ListPage.tsx dengan
 * nested Kontak/Keluarga) — jangan pernah ditimpa generator. */
function looksHandCustomized(filePath) {
  if (!existsSync(filePath)) return false
  const src = readFileSync(filePath, 'utf8')
  return src.includes('// codegen:preserve') || src.includes('renderExtra') || src.includes('InlineNestedList') || src.includes('CrudListPage')
}

function fieldToCrudField(f, opts) {
  const base = { key: f.name, required: f.required }
  if (isVillageField(f)) {
    return {
      ...base,
      type: 'custom',
      renderImport: 'RegionVillagePicker',
      renderExpr: `(value, onChange) => (\n      <RegionVillagePicker value={(value as number) ?? null} onChange={(v) => onChange(v)} />\n    )`,
    }
  }
  // relationEndpoint() ITU SENDIRI sudah menangani tebakan nama tabel utk
  // field yang type-nya 'number' tapi berakhiran `_id` (gap validasi backend
  // - lihat komentar di fungsi itu) - jadi endpoint harus dicek DULU,
  // sebelum menyaring berdasar f.type, kalau tidak tebakan itu percuma
  // (bug sebelumnya: religion_id/gender_id di GeneralEmployee type-nya
  // 'number' bukan 'relation', endpoint ketemu tapi dibuang karena gate
  // f.type === 'relation' dicek lebih dulu).
  const endpoint = relationEndpoint(f)
  if (endpoint && isLargeFk(f)) {
    // FK ke tabel besar (patients/employees/visits/dst) — dropdown polos
    // RelationSelect cuma muat 100 opsi pertama, jadi butuh AsyncCombobox
    // cari-sambil-ketik.
    return { ...base, type: 'combobox', relationEndpoint: endpoint }
  }
  if (endpoint && !isLargeFk(f)) {
    return { ...base, type: 'relation', relationEndpoint: endpoint }
  }
  if (f.type === 'relation' && !endpoint) {
    // endpoint tidak ketemu di katalog — jangan tebak, treat sebagai angka
    // polos supaya form tetap valid daripada pura-pura jadi dropdown kosong.
    return { ...base, type: 'number' }
  }
  if (f.type === 'boolean') return { ...base, type: 'checkbox' }
  if (f.type === 'date') return { ...base, type: 'date' }
  if (isEnumField(f)) {
    return {
      ...base,
      type: 'select',
      options: f.enumValues.map((v) => ({ value: v, label: humanizeEnumValue(v) })),
    }
  }
  if (f.type === 'number') return { ...base, type: 'number' }
  return { ...base } // default text
}

function guessItemLabelField(fields) {
  const preferred = ['name', 'title', 'code', 'label']
  for (const p of preferred) {
    if (fields.some((f) => f.name === p)) return p
  }
  const firstText = fields.find((f) => f.type === 'string' && !f.relation)
  return firstText?.name ?? null
}

function generateModule(entry) {
  const fields = pickStoreFields(entry)
  const resourceColumns = pickResourceColumns(entry, fields)
  const uri = entry.route.apiResources[0].uri
  const entity = toPascalCase(entry.route.apiResources[0].controller.replace(/Controller$/, ''))
  const dir = path.join(FEATURES_ROOT, entry.module)
  const listPagePath = path.join(dir, 'pages/ListPage.tsx')
  const formPagePath = path.join(dir, 'pages/FormPage.tsx')

  if (looksHandCustomized(listPagePath)) return 'hand-customized'

  mkdirSync(path.join(dir, 'pages'), { recursive: true })
  const slug = toKebab(entry.module)

  const fieldByName = new Map(fields.map((f) => [f.name, f]))

  const typeFields = fields
    .map((f) => `  ${f.name}${f.nullable ? '?' : ''}: ${tsType(f)} | null`)
    .join('\n')

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

  // --- Kolom tabel: dari resourceFields (sudah "editorial", diambil dari
  // Resource class asli), buang id/timestamp/password, batasi 6 kolom biar
  // tabel tidak sesak. Kolom yang cocok dengan field FK -> RelationLabel.
  const EXCLUDE_COLUMNS = new Set(['id', 'created_at', 'updated_at', 'password', 'remember_token'])
  const displayColumns = resourceColumns.filter((c) => !EXCLUDE_COLUMNS.has(c)).slice(0, 6)

  const isResolvableRelation = (f) => Boolean(f && relationEndpoint(f) && !isLargeFk(f))

  const relationImportNeeded = displayColumns.some((c) => isResolvableRelation(fieldByName.get(c)))

  const columnDefs = displayColumns
    .map((c) => {
      const f = fieldByName.get(c)
      // resourceFields (kolom tabel) datang dari Resource class, TIDAK
      // dijamin subset dari requestFields (dipakai bikin interface TS) —
      // beberapa modul punya kolom read-only/derived (mis. is_active di
      // PatientAccessLock) yang tidak diterima saat create/update. Akses
      // selalu lewat cast unknown, jangan andalkan typed property.
      if (isResolvableRelation(f)) {
        return `  {
    header: humanizeField('${c}'),
    cell: ({ row }) => <RelationLabel endpoint="${relationEndpoint(f)}" id={(row.original as unknown as Record<string, unknown>).${c} as number | null} />,
  },`
      }
      if (c === 'is_active') {
        return `  {
    header: humanizeField('${c}'),
    cell: ({ row }) =>
      (row.original as unknown as Record<string, unknown>).${c} ? (
        <Badge className="bg-primary/10 text-primary border-primary/20">Aktif</Badge>
      ) : (
        <Badge variant="outline" className="text-muted-foreground">Nonaktif</Badge>
      ),
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

  // --- Field form: section-grouping untuk modul berat (>10 field) supaya
  // dialog tidak jadi satu kolom sangat panjang — dibagi ~2 bagian netral
  // "Detail" / "Detail Tambahan" (heuristik urutan kolom, bukan makna
  // domain — generator tidak tahu semantik modul secara spesifik).
  const useSections = fields.length > 10
  const midpoint = Math.ceil(fields.length / 2)

  const customImports = new Set()
  const crudFieldEntries = fields.map((f, i) => {
    const cf = fieldToCrudField(f)
    if (cf.renderImport) customImports.add(cf.renderImport)
    const parts = [`key: '${f.name}'`, `label: humanizeField('${f.name}')`]
    if (cf.type && cf.type !== 'text') parts.push(`type: '${cf.type}'`)
    if (cf.relationEndpoint) parts.push(`relationEndpoint: '${cf.relationEndpoint}'`)
    if (cf.required) parts.push(`required: true`)
    if (cf.options) parts.push(`options: ${JSON.stringify(cf.options)}`)
    if (cf.renderExpr) parts.push(`render: ${cf.renderExpr}`)
    if (useSections) parts.push(`section: ${i < midpoint ? "'Detail'" : "'Detail Tambahan'"}`)
    return `  { ${parts.join(', ')} },`
  })

  const emptyFormEntries = fields
    .map((f) => {
      const cf = fieldToCrudField(f)
      const defaultVal =
        cf.type === 'checkbox' ? 'false' : cf.type === 'relation' || cf.type === 'combobox' || cf.type === 'custom' ? 'null' : "''"
      return `  ${f.name}: ${defaultVal},`
    })
    .join('\n')

  const itemLabelField = guessItemLabelField(fields)

  const imports = [
    `import type { ColumnDef } from '@tanstack/react-table'`,
    displayColumns.includes('is_active') ? `import { Badge } from '@/components/ui/badge'` : null,
    `import { CrudDialogPage, type CrudField } from '@/shared/components/CrudDialogPage'`,
    customImports.has('RegionVillagePicker') ? `import { RegionVillagePicker } from '@/shared/components/RegionVillagePicker'` : null,
    relationImportNeeded ? `import { RelationLabel } from '@/shared/components/RelationLabel'` : null,
    `import { humanizeField, humanizeModuleName } from '@/shared/labels'`,
    `import { use${entity}Resource } from '../api'`,
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

export function ${entity}ListPage() {
  const resource = use${entity}Resource()
  const title = humanizeModuleName('${entry.module}')

  return (
    <CrudDialogPage<${entity}>
      title={title}
      description={\`Kelola data \${title.toLowerCase()}.\`}
      columns={columns}
      fields={fields}
      emptyForm={emptyForm}
      itemLabel={(item) => ${itemLabelField ? `item.${itemLabelField} ?? \`#\${item.id}\`` : `\`#\${item.id}\``}}
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

  const eligible = catalog.filter(isEligibleShape1)
  const toGenerate = targets ? eligible.filter((e) => targets.includes(e.module)) : eligible

  let generated = 0
  let skippedNotFullCrud = 0
  let skippedHandCustomized = 0
  let failed = 0
  for (const entry of toGenerate) {
    if (!isEligibleForDialog(entry)) {
      skippedNotFullCrud++
      continue
    }
    try {
      const result = generateModule(entry)
      if (result === 'generated') generated++
      else if (result === 'hand-customized') skippedHandCustomized++
    } catch (err) {
      failed++
      console.error(`GAGAL ${entry.module}:`, err.message)
    }
  }
  console.log(
    `Digenerate: ${generated} modul. Dilewati: ${skippedNotFullCrud} (bukan full CRUD/ada workflow verb), ${skippedHandCustomized} (sudah di-tangan). Gagal: ${failed}. (dari ${eligible.length} kandidat bentuk-1 layak, ${catalog.length} total modul)`,
  )
  if (!existsSync(FEATURES_ROOT)) mkdirSync(FEATURES_ROOT, { recursive: true })
}

main()
