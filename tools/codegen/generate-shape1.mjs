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

function pickStoreFields(entry) {
  const reqKeys = Object.keys(entry.requestFields)
  const storeKey = reqKeys.find((k) => /^Store/i.test(k)) ?? reqKeys[0]
  if (storeKey) return entry.requestFields[storeKey]
  const inlineKeys = Object.keys(entry.inlineFields)
  const storeInline = inlineKeys.find((k) => k.endsWith('::store')) ?? inlineKeys[0]
  if (storeInline) return entry.inlineFields[storeInline]
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

function tsType(field) {
  if (field.type === 'boolean') return 'boolean'
  if (field.type === 'number' || field.type === 'relation') return 'number'
  return 'string'
}

function inputType(field) {
  if (field.type === 'boolean') return 'checkbox'
  if (field.type === 'number' || field.type === 'relation') return 'number'
  if (field.type === 'date') return 'date'
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

function generateModule(entry) {
  const fields = pickStoreFields(entry)
  const columns = pickResourceColumns(entry, fields)
  const uri = entry.route.apiResources[0].uri
  const entity = toPascalCase(entry.route.apiResources[0].controller.replace(/Controller$/, ''))
  const dir = path.join(FEATURES_ROOT, entry.module)
  mkdirSync(path.join(dir, 'pages'), { recursive: true })

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

  const listPageTsx = `import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { use${entity}Resource } from '../api'

const COLUMNS = ${JSON.stringify(columns)} as const

export function ${entity}ListPage() {
  const { list } = use${entity}Resource()
  const { data, isLoading } = list()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">${toLabel(entity)}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((row) => (
            <TableRow key={row.id}>
              {COLUMNS.map((col) => (
                <TableCell key={col}>{String((row as unknown as Record<string, unknown>)[col] ?? '-')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
`

  const formFieldsJsx = fields
    .map((f) => {
      const label = toLabel(f.name)
      const type = inputType(f)
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
  const formPageTsx = `import { useState } from 'react'
import { Button } from '@/components/ui/button'
${hasCheckbox ? "import { Checkbox } from '@/components/ui/checkbox'\n" : ''}import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { use${entity}Resource } from '../api'
import type { ${entity}FormValues } from '../types'

export function ${entity}FormPage() {
  const { create } = use${entity}Resource()
  const [values, setValues] = useState<${entity}FormValues>({})

  return (
    <form
      className="mx-auto grid max-w-lg gap-4 p-4"
      onSubmit={(e) => {
        e.preventDefault()
        create.mutate(values)
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
