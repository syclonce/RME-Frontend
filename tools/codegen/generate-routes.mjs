#!/usr/bin/env node
/** Cetak src/routes/generated.tsx: daftar route lazy-load untuk semua fitur yang sudah digenerate. */
import { readdirSync, statSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const FEATURES_ROOT = path.resolve(here, '../../src/features')
const OUT_FILE = path.resolve(here, '../../src/routes/generated.tsx')
const READONLY_MANIFEST = path.resolve(here, 'output/readonly-pages.json')

function toKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

const modules = readdirSync(FEATURES_ROOT).filter((n) => statSync(path.join(FEATURES_ROOT, n)).isDirectory())
const readonlyManifest = existsSync(READONLY_MANIFEST) ? JSON.parse(readFileSync(READONLY_MANIFEST, 'utf8')) : []
const readonlyFiles = new Set(readonlyManifest.map((e) => `${e.module}/${e.fileName}`))

// Bentuk #1 (CRUD): pages/ListPage.tsx sebagai file utama, punya FormPage.tsx pendamping.
const crudEntries = modules
  .filter((m) => existsSync(path.join(FEATURES_ROOT, m, 'pages/ListPage.tsx')))
  .filter((m) => !readonlyFiles.has(`${m}/ListPage.tsx`))
  .map((m) => ({ module: m, slug: toKebab(m), hasForm: existsSync(path.join(FEATURES_ROOT, m, 'pages/FormPage.tsx')) }))

// Bentuk #6 (read-only): satu atau lebih ListPage*.tsx per modul, dari manifest generate-readonly.mjs.
const readonlyEntries = readonlyManifest.map((e) => ({
  module: e.module,
  slug: `${toKebab(e.module)}-${toKebab(e.entityName)}`,
  fileName: e.fileName,
}))

let importLines = []
let routeLines = []
let counter = 0

for (const e of crudEntries) {
  const i = counter++
  importLines.push(
    `const List_${i} = lazy(() => import('@/features/${e.module}/pages/ListPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))`,
  )
  routeLines.push(`  { path: '/modul/${e.slug}', module: '${e.module}', element: <List_${i} /> },`)
  if (e.hasForm) {
    importLines.push(
      `const Form_${i} = lazy(() => import('@/features/${e.module}/pages/FormPage').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))`,
    )
    routeLines.push(`  { path: '/modul/${e.slug}/tambah', module: '${e.module}', element: <Form_${i} /> },`)
    routeLines.push(`  { path: '/modul/${e.slug}/:id/edit', module: '${e.module}', element: <Form_${i} /> },`)
  }
}

for (const e of readonlyEntries) {
  const i = counter++
  const importPath = e.fileName.replace(/\.tsx$/, '')
  importLines.push(
    `const List_${i} = lazy(() => import('@/features/${e.module}/pages/${importPath}').then((m) => ({ default: Object.values(m)[0] as React.ComponentType })))`,
  )
  routeLines.push(`  { path: '/modul/${e.slug}', module: '${e.module}', element: <List_${i} /> },`)
}

const content = `// FILE HASIL GENERATOR (tools/codegen/generate-routes.mjs) - JANGAN EDIT TANGAN.
// Jalankan ulang generator kalau ada modul baru, jangan sunting file ini langsung.
import { lazy } from 'react'
import type { ReactElement } from 'react'

${importLines.join('\n')}

export interface GeneratedRoute {
  path: string
  module: string
  element: ReactElement
}

export const generatedRoutes: GeneratedRoute[] = [
${routeLines.join('\n')}
]
`

writeFileSync(OUT_FILE, content)
console.log(`Ditulis ${crudEntries.length} modul CRUD + ${readonlyEntries.length} halaman read-only ke src/routes/generated.tsx`)
