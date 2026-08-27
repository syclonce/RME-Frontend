#!/usr/bin/env node
/** Cetak src/routes/generated.tsx: daftar route lazy-load untuk semua fitur yang sudah digenerate. */
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const FEATURES_ROOT = path.resolve(here, '../../src/features')
const OUT_FILE = path.resolve(here, '../../src/routes/generated.tsx')

function toKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

const modules = readdirSync(FEATURES_ROOT).filter((n) => statSync(path.join(FEATURES_ROOT, n)).isDirectory())

const entries = modules
  .filter((m) => existsSync(path.join(FEATURES_ROOT, m, 'pages/ListPage.tsx')))
  .map((m) => {
    const slug = toKebab(m)
    return { module: m, slug }
  })

const imports = entries
  .map(
    (e, i) =>
      `const List_${i} = lazy(() => import('@/features/${e.module}/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))
const Form_${i} = lazy(() => import('@/features/${e.module}/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))`,
  )
  .join('\n')

const routeEntries = entries
  .map(
    (e, i) =>
      `  { path: '/modul/${e.slug}', module: '${e.module}', element: <List_${i} /> },
  { path: '/modul/${e.slug}/tambah', module: '${e.module}', element: <Form_${i} /> },`,
  )
  .join('\n')

const content = `// FILE HASIL GENERATOR (tools/codegen/generate-routes.mjs) - JANGAN EDIT TANGAN.
// Jalankan ulang generator kalau ada modul baru, jangan sunting file ini langsung.
import { lazy } from 'react'
import type { ReactElement } from 'react'

${imports}

export interface GeneratedRoute {
  path: string
  module: string
  element: ReactElement
}

export const generatedRoutes: GeneratedRoute[] = [
${routeEntries}
]
`

writeFileSync(OUT_FILE, content)
console.log(`Ditulis ${entries.length} pasang rute (list+form) ke src/routes/generated.tsx`)
