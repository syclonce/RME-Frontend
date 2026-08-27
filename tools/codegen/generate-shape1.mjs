#!/usr/bin/env node
/**
 * Generator BENTUK #1 (CRUD sederhana + picker) — bentuk terbesar dalam
 * taksonomi 10-bentuk (lihat memori rme-frontend-codegen-llm). Baca
 * tools/codegen/output/modules-catalog.json (hasil extract-metadata.mjs,
 * murni deterministik tanpa LLM) lalu cetak src/features/<Modul>/{types.ts,
 * api.ts, pages/ListPage.tsx, pages/FormPage.tsx} untuk modul yang cocok.
 *
 * HANYA jalankan untuk modul yang benar-benar bentuk #1 (full/near-full CRUD,
 * field flat + relasi sederhana). Modul bentuk lain (append-only, workflow,
 * nested-list, dst) TIDAK cocok dan akan dilewati otomatis kalau tidak masuk
 * daftar target eksplisit.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
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

/** Tabel yang dianggap "besar" (ribuan+ baris) — field FK ke sini pakai
 * AsyncCombobox cari-sambil-ketik, bukan RelationSelect dropdown polos
 * yang cuma muat 100 opsi pertama. */
const LARGE_TABLES = new Set([
  'patients', 'employees', 'visits', 'services', 'registrations',
  'invoices', 'invoice_items', 'prescriptions', 'prescription_items',
  'drugs', 'medication_stocks', 'bed_occupancies',
  'lab_orders', 'radiology_orders', 'users',
])

function pickStoreFields(entry) {
  const reqKeys = Object.keys(entry.requestFields)
  const storeKey = reqKeys.find((k) => /^Store/i.test(k)) ?? reqKeys[0]
  if (storeKey && entry.requestFields[storeKey].length > 0) return entry.requestFields[storeKey]
  const inlineKeys = Object.keys(entry.inlineFields)
  const storeInline = inlineKeys.find((k) => k.endsWith('::store')) ?? inlineKeys.find((k) => k.endsWith('::rules')) ?? inlineKeys[0]
  if (storeInline && entry.inlineFields[storeInline].length > 0) return entry.inlineFields[storeInline]
  // FormRequest class ADA tapi rules() kosong (validasi didelegasikan ke tempat
  // lain, mis. Rule dinamis) - fallback ke apa pun yang ditemukan, biar tidak
  // salah dianggap "tanpa field" padahal cuma parser regex yang tak menjangkau.
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

function toLabel(fieldName) {
  return fieldName
    .replace(/_id$/, '')
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
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

function inputType(field) {
  if (field.type === 'boolean') return 'checkbox'
  if (field.type === 'number' || field.type === 'relation') return 'number'
  if (field.type === 'date') return 'date'
  if (isEnumField(field)) return 'enum'
  return 'text'
}

function isEligibleShape1(entry) {
  const apiResources = entry.route.apiResources ?? []
  if (apiResources.length === 0) return false
  const fields = pickStoreFields(entry)
  if (!fields || fields.length === 0) return false
  // Bentuk lain yang harus DILEWATI generator ini (heuristik minimum):
  // - tidak ada endpoint verb custom non-CRUD (workflow eksplisit)
  const customVerbs = (entry.route.verbs ?? []).filter(
    (v) => !['index', 'show', 'store', 'update', 'destroy'].includes(v.verb),
  )
  if (customVerbs.length > 3) return false // banyak endpoint aksi = kemungkinan besar bentuk workflow
  return true
}

function toKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function generateModule(entry) {
  const fields = pickStoreFields(entry)
  const columns = pickResourceColumns(entry, fields)
  const uri = entry.route.apiResources[0].uri
  const entity = toPascalCase(entry.route.apiResources[0].controller.replace(/Controller$/, ''))
  const dir = path.join(FEATURES_ROOT, entry.module)
  mkdirSync(path.join(dir, 'pages'), { recursive: true })
  const slug = toKebab(entry.module)
  const hasDestroy = (entry.route.apiResources ?? []).some((r) => r.chain.includes("'destroy'") || r.chain === '')
  const hasUpdate = (entry.route.apiResources ?? []).some((r) => r.chain.includes("'update'") || r.chain === '')

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

  const actionsHeader = (hasUpdate || hasDestroy) ? `\n            <TableHead>Aksi</TableHead>` : ''
  const editLink = hasUpdate
    ? `<Link to={\`/modul/${slug}/\${row.id}/edit\`} className="text-primary underline">Ubah</Link>`
    : ''
  const deleteButton = hasDestroy
    ? `<Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm('Hapus data ini?')) remove.mutate(row.id)
                    }}
                  >
                    Hapus
                  </Button>`
    : ''
  const actionsCell = (hasUpdate || hasDestroy)
    ? `\n              <TableCell>
                <div className="flex items-center gap-2">
                  ${editLink}
                  ${deleteButton}
                </div>
              </TableCell>`
    : ''

  const listPageTsx = `import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { use${entity}Resource } from '../api'

const COLUMNS = ${JSON.stringify(columns)} as const

export function ${entity}ListPage() {
  const { useList${hasDestroy ? ', remove' : ''} } = use${entity}Resource()
  const { data, isLoading } = useList()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">${toLabel(entity)}</h1>
        <Button asChild>
          <Link to="/modul/${slug}/tambah">Tambah</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}${actionsHeader}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((row) => (
            <TableRow key={row.id}>
              {COLUMNS.map((col) => (
                <TableCell key={col}>{String((row as unknown as Record<string, unknown>)[col] ?? '-')}</TableCell>
              ))}${actionsCell}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
`

function pluralizeGuess(word) {
  if (/(s|ss|sh|ch|x|z)$/.test(word)) return `${word}es`
  if (/[^aeiou]y$/.test(word)) return `${word.slice(0, -1)}ies`
  return `${word}s`
}

/**
 * Sebagian field FK di RME-Backend TIDAK punya rule `exists:table,id`
 * (gap validasi backend, bukan sesuatu yang bisa diperbaiki dari sisi
 * ekstraktor - datanya memang tidak ada di kode) - fallback tebak nama
 * tabel dari konvensi penamaan field `xxx_id` -> tabel `xxxs`, dicek
 * balik ke katalog supaya tidak asal tebak endpoint yang tidak ada.
 */
function relationEndpoint(field) {
  if (field.relation) return TABLE_TO_ENDPOINT.get(field.relation.table) ?? null
  if (field.type === 'number' && field.name.endsWith('_id')) {
    const guess = pluralizeGuess(field.name.slice(0, -3))
    return TABLE_TO_ENDPOINT.get(guess) ?? null
  }
  return null
}

  const formFieldsJsx = fields
    .map((f) => {
      const label = toLabel(f.name)
      const type = inputType(f)
      const endpoint = relationEndpoint(f)
      if (f.type === 'relation' && f.relation?.table === 'indonesia_villages') {
        return `      <div className="grid gap-1.5">
        <Label>${label}${f.required ? ' *' : ''}</Label>
        <RegionVillagePicker
          value={values.${f.name} ?? null}
          onChange={(v) => setValues({ ...values, ${f.name}: v })}
        />
      </div>`
      }
      if (endpoint) {
        const isLarge = f.relation && LARGE_TABLES.has(f.relation.table)
        if (isLarge) {
          return `      <div className="grid gap-1.5">
        <Label htmlFor="${f.name}">${label}${f.required ? ' *' : ''}</Label>
        <AsyncCombobox
          endpoint="${endpoint}"
          value={values.${f.name} ?? null}
          onChange={(v) => setValues({ ...values, ${f.name}: v })}
        />
      </div>`
        }
        return `      <div className="grid gap-1.5">
        <Label htmlFor="${f.name}">${label}${f.required ? ' *' : ''}</Label>
        <RelationSelect
          endpoint="${endpoint}"
          value={values.${f.name} ?? null}
          onChange={(v) => setValues({ ...values, ${f.name}: v })}
        />
      </div>`
      }
      if (type === 'enum') {
        const enumOptions = f.enumValues
          .map((v) => `            <SelectItem key="${v}" value="${v}">${humanizeEnumValue(v)}</SelectItem>`)
          .join('\n')
        return `      <div className="grid gap-1.5">
        <Label htmlFor="${f.name}">${label}${f.required ? ' *' : ''}</Label>
        <Select value={values.${f.name} ?? ''} onValueChange={(v) => setValues({ ...values, ${f.name}: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih..." />
          </SelectTrigger>
          <SelectContent>
${enumOptions}
          </SelectContent>
        </Select>
      </div>`
      }
      if (type === 'checkbox') {
        return `      <div className="flex items-center gap-2">
        <Checkbox id="${f.name}" checked={!!values.${f.name}} onCheckedChange={(v) => setValues({ ...values, ${f.name}: !!v })} />
        <Label htmlFor="${f.name}">${label}</Label>
      </div>`
      }
      const isNumeric = type === 'number'
      const onChange = isNumeric
        ? `(e) => setValues({ ...values, ${f.name}: e.target.value === '' ? null : Number(e.target.value) })`
        : `(e) => setValues({ ...values, ${f.name}: e.target.value })`
      return `      <div className="grid gap-1.5">
        <Label htmlFor="${f.name}">${label}${f.required ? ' *' : ''}</Label>
        <Input id="${f.name}" type="${type}" value={values.${f.name} ?? ''} onChange={${onChange}} />
      </div>`
    })
    .join('\n')

  const hasCheckbox = fields.some((f) => inputType(f) === 'checkbox')
  const isVillageField = (f) => f.type === 'relation' && f.relation?.table === 'indonesia_villages'
  const isLargeFk = (f) => f.relation && LARGE_TABLES.has(f.relation.table) && relationEndpoint(f)
  const isSmallFk = (f) => relationEndpoint(f) && !isLargeFk(f)
  const hasRelationSelect = fields.some(isSmallFk)
  const hasAsyncCombobox = fields.some(isLargeFk)
  const hasVillagePicker = fields.some(isVillageField)
  const hasEnumSelect = fields.some((f) => isEnumField(f))
  const hasPlainInput = fields.some((f) => relationEndpoint(f) === null && !isVillageField(f) && inputType(f) !== 'checkbox' && inputType(f) !== 'enum')

  const formPageTsx = hasUpdate
    ? `import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
${hasCheckbox ? "import { Checkbox } from '@/components/ui/checkbox'\n" : ''}${hasEnumSelect ? "import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'\n" : ''}${hasPlainInput ? "import { Input } from '@/components/ui/input'\n" : ''}import { Label } from '@/components/ui/label'
${hasRelationSelect ? "import { RelationSelect } from '@/shared/components/RelationSelect'\n" : ''}${hasAsyncCombobox ? "import { AsyncCombobox } from '@/shared/components/AsyncCombobox'\n" : ''}${hasVillagePicker ? "import { RegionVillagePicker } from '@/shared/components/RegionVillagePicker'\n" : ''}import { use${entity}Resource } from '../api'
import type { ${entity}FormValues } from '../types'

export function ${entity}FormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = id !== undefined
  const { create, update, useDetail } = use${entity}Resource()
  const existing = useDetail(isEdit ? Number(id) : undefined)
  const [values, setValues] = useState<${entity}FormValues>({})

  useEffect(() => {
    if (existing.data) setValues(existing.data as unknown as ${entity}FormValues)
  }, [existing.data])

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (isEdit) update.mutate({ id: Number(id), payload: values }, { onSuccess: () => navigate('/modul/${slug}') })
        else create.mutate(values, { onSuccess: () => navigate('/modul/${slug}') })
      }}
    >
      <h1 className="text-lg font-semibold">{isEdit ? 'Ubah' : 'Tambah'} ${toLabel(entity)}</h1>
${formFieldsJsx}
      <Button type="submit" disabled={create.isPending || update.isPending}>
        Simpan
      </Button>
    </form>
  )
}
`
    : `import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
${hasCheckbox ? "import { Checkbox } from '@/components/ui/checkbox'\n" : ''}${hasEnumSelect ? "import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'\n" : ''}${hasPlainInput ? "import { Input } from '@/components/ui/input'\n" : ''}import { Label } from '@/components/ui/label'
${hasRelationSelect ? "import { RelationSelect } from '@/shared/components/RelationSelect'\n" : ''}${hasAsyncCombobox ? "import { AsyncCombobox } from '@/shared/components/AsyncCombobox'\n" : ''}${hasVillagePicker ? "import { RegionVillagePicker } from '@/shared/components/RegionVillagePicker'\n" : ''}import { use${entity}Resource } from '../api'
import type { ${entity}FormValues } from '../types'

export function ${entity}FormPage() {
  const navigate = useNavigate()
  const { create } = use${entity}Resource()
  const [values, setValues] = useState<${entity}FormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values, { onSuccess: () => navigate('/modul/${slug}') })
      }}
    >
      <h1 className="text-lg font-semibold">Tambah ${toLabel(entity)}</h1>
${formFieldsJsx}
      <Button type="submit" disabled={create.isPending}>
        Simpan
      </Button>
    </form>
  )
}
`

  writeFileSync(path.join(dir, 'types.ts'), typesTs)
  writeFileSync(path.join(dir, 'api.ts'), apiTs)
  writeFileSync(path.join(dir, 'pages/ListPage.tsx'), listPageTsx)
  writeFileSync(path.join(dir, 'pages/FormPage.tsx'), formPageTsx)
}

function main() {
  const targetArg = process.argv[2]
  const targets = targetArg ? targetArg.split(',') : null

  const eligible = catalog.filter(isEligibleShape1)
  const toGenerate = targets ? eligible.filter((e) => targets.includes(e.module)) : eligible

  let count = 0
  for (const entry of toGenerate) {
    try {
      generateModule(entry)
      count++
    } catch (err) {
      console.error(`GAGAL ${entry.module}:`, err.message)
    }
  }
  console.log(`Digenerate: ${count} modul (dari ${eligible.length} kandidat bentuk-1 layak, ${catalog.length} total modul).`)
  if (!existsSync(FEATURES_ROOT)) mkdirSync(FEATURES_ROOT, { recursive: true })
}

main()
