#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '..')
const BACKEND = path.resolve(ROOT, '../RME-Backend/Modules')
const FRONTEND = path.resolve(ROOT, 'src')

const coverageOverrides = new Map([
  ['Grup::POST notifications', 'Ingress machine-to-machine dilindungi HMAC; bukan endpoint browser.'],
  ['Grup::GET patients/{patient}', 'Relay machine-to-machine; browser memakai endpoint grup/patients/{branchId}/{patientId}.'],
  ['Grup::GET referrals/{referralId}', 'Relay machine-to-machine; browser memakai endpoint grup/referrals.'],
  ['LayananPharmacyDispense::POST prescriptions/{prescription}/dispense', 'UI memakai POST pharmacy-dispenses yang mendelegasikan ke DispenseService yang sama.'],
  ['AplikasiSetting::GET settings/{key}', 'UI menyusun path dari konstanta SettingsEndpoint dan key dinamis.'],
  ['AplikasiSetting::PUT settings/{key}', 'UI menyusun path dari konstanta SettingsEndpoint dan key dinamis.'],
  ['AplikasiSetting::PATCH settings/{key}', 'PUT dan PATCH menuju kontrak update yang sama; UI memakai PUT.'],
  ['CetakanPrintDocument::POST print-documents/issue', 'UI menyusun path dari konstanta PrintDocumentEndpoint dan suffix issue.'],
  ['CetakanPrintDocument::GET print-documents/{document}', 'UI menyusun path detail dari konstanta PrintDocumentEndpoint dan id dinamis.'],
])

const sharedSources = new Map([
  ['Auth', ['contexts/AuthContext.tsx', 'layouts/AppLayout.tsx']],
  ['Authorization', ['contexts/AuthContext.tsx']],
])

function walk(dir, output = []) {
  if (!fs.existsSync(dir)) return output
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(target, output)
    else output.push(target)
  }
  return output
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function routeRegex(route) {
  const normalizedRoute = route.replace(/^\/+/, '')
  const parts = normalizedRoute.split(/(\{[^}]+\})/g).filter(Boolean)
  const pattern = parts.map((part) => part.startsWith('{')
    ? "(?:\\$\\{[^}]+\\}|\\{[^}]+\\}|[^/`\"']+)"
    : escapeRegex(part)).join('')
  return new RegExp("[/\"']" + pattern + "(?:[?'\"`]|$)")
}

function endpointCovered(route, sources) {
  const regex = routeRegex(route)
  return sources.some(({ text }) => regex.test(text))
}

const frontendFiles = walk(FRONTEND).filter((file) => /\.(ts|tsx)$/.test(file))
const frontendSources = frontendFiles.map((file) => ({ file, text: fs.readFileSync(file, 'utf8') }))
const modules = fs.readdirSync(BACKEND).filter((name) => fs.statSync(path.join(BACKEND, name)).isDirectory()).sort()
const report = []

for (const moduleName of modules) {
  const routeFile = path.join(BACKEND, moduleName, 'routes/api.php')
  if (!fs.existsSync(routeFile)) continue
  const php = fs.readFileSync(routeFile, 'utf8')
  const endpoints = []
  let match

  const resourceRegex = /Route::apiResource\(\s*['"]([^'"]+)['"]/g
  while ((match = resourceRegex.exec(php))) endpoints.push({ method: 'RESOURCE', route: match[1] })

  const verbRegex = /Route::(get|post|put|patch|delete)\(\s*['"]([^'"]+)['"]/g
  while ((match = verbRegex.exec(php))) endpoints.push({ method: match[1].toUpperCase(), route: match[2] })

  const moduleDir = path.join(FRONTEND, 'features', moduleName)
  const moduleSources = frontendSources.filter(({ file }) => file.startsWith(moduleDir + path.sep))
  for (const relative of sharedSources.get(moduleName) ?? []) {
    const file = path.join(FRONTEND, relative)
    if (fs.existsSync(file)) moduleSources.push({ file, text: fs.readFileSync(file, 'utf8') })
  }

  const checked = endpoints.map((endpoint) => {
    const key = `${moduleName}::${endpoint.method} ${endpoint.route}`
    if (coverageOverrides.has(key)) return { ...endpoint, status: 'covered-equivalent', reason: coverageOverrides.get(key) }
    if (endpointCovered(endpoint.route, moduleSources)) return { ...endpoint, status: 'covered-in-module' }
    const elsewhere = endpointCovered(endpoint.route, frontendSources)
    return { ...endpoint, status: elsewhere ? 'covered-elsewhere' : 'GAP' }
  })

  report.push({ module: moduleName, endpoints: checked, gaps: checked.filter((item) => item.status === 'GAP').length })
}

const gapModules = report.filter((item) => item.gaps > 0)
const outputFile = path.join(HERE, 'endpoint-coverage-report.json')
fs.writeFileSync(outputFile, JSON.stringify(report, null, 2))

console.log(`Modules scanned: ${modules.length}`)
console.log(`Modules with routes: ${report.length}`)
console.log(`Modules with gaps: ${gapModules.length}`)
console.log('\n--- GAP DETAIL ---')
for (const moduleResult of gapModules) {
  for (const endpoint of moduleResult.endpoints.filter((item) => item.status === 'GAP')) {
    console.log(`${moduleResult.module} :: ${endpoint.method} ${endpoint.route}`)
  }
}
console.log(`\nReport: ${outputFile}`)
