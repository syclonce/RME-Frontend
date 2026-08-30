#!/usr/bin/env node
/**
 * Generator BENTUK #6 (read-only / laporan) — modul tanpa store/update/destroy
 * sama sekali (index/show saja, atau custom GET route polos). Cetak HANYA
 * ListPage per endpoint (bisa >1 per modul, mis. FinanceGeneralLedger py
 * accounts + journal-entries dari 2 controller berbeda).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const CATALOG_PATH = path.resolve(here, 'output/modules-catalog.json')
const FEATURES_ROOT = path.resolve(here, '../../src/features')

const catalog = JSON.parse(readFileSync(CATALOG_PATH, 'utf8'))

// Modul yang SENGAJA dikecualikan dari generator ini:
// - GeneralRegion: bespoke, sudah ditulis manual (RegionVillagePicker + api.ts
//   cascading provinsi->kota->kecamatan->desa) - lihat memori rme-frontend-codegen-llm.
// - DashboardCore/KemkesReport: endpoint mengembalikan OBJEK AGREGAT tunggal
//   (mis. {beds:{...}, occupancy_rate:...}), bukan array/list - template
//   tabel generator ini salah untuk bentuk ini, butuh komponen dashboard
//   custom terpisah (belum dibuat).
const EXCLUDE_MODULES = new Set(['GeneralRegion', 'DashboardCore', 'KemkesReport'])

function toPascalCase(str) {
  return str.replace(/(^\w|[_\-/]\w)/g, (m) => m.replace(/[_\-/]/, '').toUpperCase())
}

function isReadOnly(entry) {
  const hasWriteApiResource = (entry.route.apiResources ?? []).some(
    (r) => !r.chain.includes("only(['index', 'show']") && !r.chain.includes("only(['show', 'index']"),
  )
  const hasWriteVerb = (entry.route.verbs ?? []).some((v) => v.verb !== 'get')
  const hasAnyEndpoint = (entry.route.apiResources ?? []).length > 0 || (entry.route.verbs ?? []).length > 0
  return hasAnyEndpoint && !hasWriteApiResource && !hasWriteVerb
}

function endpointsOf(entry) {
  const fromResources = (entry.route.apiResources ?? []).map((r) => ({ uri: r.uri, controller: r.controller }))
  const fromVerbs = (entry.route.verbs ?? [])
    .filter((v) => v.verb === 'get' && !v.uri.includes('{'))
    .map((v) => ({ uri: v.uri, controller: null }))
  const seen = new Set()
  return [...fromResources, ...fromVerbs].filter((e) => {
    if (seen.has(e.uri)) return false
    seen.add(e.uri)
    return true
  })
}

function matchResourceKey(entry, controller) {
  const keys = Object.keys(entry.resourceFields)
  if (keys.length === 1) return keys[0]
  if (controller) {
    const base = controller.replace(/Controller$/, '')
    const match = keys.find((k) => k.replace(/Resource$/, '') === base)
    if (match) return match
  }
  return keys[0]
}

function generateEndpoint(entry, endpoint, index) {
  const resourceKey = matchResourceKey(entry, endpoint.controller)
  const columns = resourceKey ? entry.resourceFields[resourceKey] : ['id']
  const entityName = toPascalCase((endpoint.controller ?? endpoint.uri).replace(/Controller$/, ''))
  const dir = path.join(FEATURES_ROOT, entry.module)
  mkdirSync(path.join(dir, 'pages'), { recursive: true })
  const fileName = index === 0 ? 'ListPage.tsx' : `ListPage${index}.tsx`
  const pagePath = path.join(dir, 'pages', fileName)
  if (existsSync(pagePath) && readFileSync(pagePath, 'utf8').includes('// codegen:preserve')) {
    return { module: entry.module, uri: endpoint.uri, fileName, entityName }
  }

  const pageTsx = `import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeList } from '@/shared/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const COLUMNS = ${JSON.stringify(columns)} as const

export function ${entityName}ListPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['/${endpoint.uri}', 'list'],
    queryFn: async () => {
      const res = await apiClient.get('/${endpoint.uri}')
      return normalizeList<Record<string, unknown>>(res.data)
    },
  })

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat...</p>

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">${entityName} (read-only)</h1>
      <Table>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableHead key={col}>{col}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items.map((row, i) => (
            <TableRow key={(row as { id?: number }).id ?? i}>
              {COLUMNS.map((col) => (
                <TableCell key={col}>{String((row as Record<string, unknown>)[col] ?? '-')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
`

  writeFileSync(pagePath, pageTsx)
  return { module: entry.module, uri: endpoint.uri, fileName, entityName }
}

function main() {
  const targetArg = process.argv[2]
  const targets = targetArg ? targetArg.split(',') : null

  const eligible = catalog.filter((e) => isReadOnly(e) && !EXCLUDE_MODULES.has(e.module))
  const toGenerate = targets ? eligible.filter((e) => targets.includes(e.module)) : eligible

  const generated = []
  for (const entry of toGenerate) {
    const endpoints = endpointsOf(entry)
    endpoints.forEach((ep, i) => {
      try {
        generated.push(generateEndpoint(entry, ep, i))
      } catch (err) {
        console.error(`GAGAL ${entry.module}/${ep.uri}:`, err.message)
      }
    })
  }

  // Manifest dibaca generate-routes.mjs supaya tiap ListPage bernomor (multi-
  // endpoint per modul) dapat slug rute yang jelas dari uri asli, bukan angka.
  const manifestPath = path.resolve(here, 'output/readonly-pages.json')
  const existing = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : []
  const filtered = existing.filter((e) => !toGenerate.some((t) => t.module === e.module))
  writeFileSync(manifestPath, JSON.stringify([...filtered, ...generated], null, 2))

  console.log(`Digenerate: ${generated.length} halaman read-only dari ${toGenerate.length} modul (kandidat total: ${eligible.length}).`)
}

main()
