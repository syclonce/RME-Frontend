#!/usr/bin/env node
/**
 * Generator BENTUK #10 (bespoke/konsol API) — fallback terakhir utk modul
 * yang TIDAK cocok bentuk #1 (CRUD)/#6 (read-only): integrasi eksternal
 * heterogen (BPJS/SATUSEHAT/dll), RPC generik (EKlaim), atau modul teknis
 * (SystemLicenseGuard). Cetak SATU halaman `ApiConsole` per modul berisi
 * semua rute-nya - BUKAN UI klinis dipoles, murni alat teknis supaya
 * modul ini "punya representasi" sambil menunggu bespoke UI sungguhan.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const CATALOG_PATH = path.resolve(here, 'output/modules-catalog.json')
const FEATURES_ROOT = path.resolve(here, '../../src/features')

const catalog = JSON.parse(readFileSync(CATALOG_PATH, 'utf8'))

function allRoutesOf(entry) {
  const fromResources = (entry.route.apiResources ?? []).flatMap((r) => {
    const chain = r.chain ?? ''
    const verbs = []
    if (chain === '' || chain.includes("'index'")) verbs.push({ verb: 'get', uri: r.uri })
    if (chain === '' || chain.includes("'show'")) verbs.push({ verb: 'get', uri: `${r.uri}/{id}` })
    if (chain === '' || chain.includes("'store'")) verbs.push({ verb: 'post', uri: r.uri })
    if (chain === '' || chain.includes("'update'")) verbs.push({ verb: 'put', uri: `${r.uri}/{id}` })
    if (chain === '' || chain.includes("'destroy'")) verbs.push({ verb: 'delete', uri: `${r.uri}/{id}` })
    return verbs
  })
  const fromVerbs = (entry.route.verbs ?? []).map((v) => ({ verb: v.verb, uri: v.uri.replace(/^\//, '') }))
  return [...fromResources, ...fromVerbs]
}

function generateModule(entry) {
  const routes = allRoutesOf(entry)
  if (routes.length === 0) return false

  const dir = path.join(FEATURES_ROOT, entry.module)
  const pagePath = path.join(dir, 'pages/ListPage.tsx')
  if (existsSync(pagePath) && readFileSync(pagePath, 'utf8').includes('// codegen:preserve')) return false
  mkdirSync(path.join(dir, 'pages'), { recursive: true })

  const pageTsx = `import { ApiConsole } from '@/shared/components/ApiConsole'

const ROUTES = ${JSON.stringify(routes, null, 2)} as const

export function ${entry.module}ListPage() {
  return <ApiConsole moduleName="${entry.module}" routes={[...ROUTES]} />
}
`

  writeFileSync(pagePath, pageTsx)
  return true
}

function main() {
  const targetArg = process.argv[2]
  const targets = targetArg ? targetArg.split(',') : null
  const toGenerate = targets ? catalog.filter((e) => targets.includes(e.module)) : []

  let count = 0
  for (const entry of toGenerate) {
    if (generateModule(entry)) count++
  }
  console.log(`Digenerate: ${count} konsol API modul.`)
}

main()
