import { useState } from 'react'
import { apiClient } from '@/api/client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export interface ConsoleRoute {
  verb: 'get' | 'post' | 'put' | 'patch' | 'delete'
  uri: string
}

interface ApiConsoleProps {
  moduleName: string
  routes: ConsoleRoute[]
}

/**
 * Konsol API generik (bentuk #7/#10 bespoke - integrasi eksternal & modul
 * teknis lain yang terlalu heterogen utk template CRUD/read-only biasa,
 * lihat memori rme-frontend-codegen-llm). BUKAN UI klinis yang dipoles -
 * ini alat teknis: isi parameter path + body JSON, kirim, lihat respons
 * mentah. Cukup utk staf teknis/integrasi menguji & memicu endpoint;
 * modul yang sering dipakai staf non-teknis (mis. resep, tagihan) sudah
 * dapat halaman khusus terpisah, bukan lewat konsol ini.
 */
export function ApiConsole({ moduleName, routes }: ApiConsoleProps) {
  return (
    <div className="p-4">
      <h1 className="mb-1 text-lg font-semibold">{moduleName}</h1>
      <p className="text-muted-foreground mb-4 text-sm">
        Konsol API teknis — modul ini terlalu heterogen untuk form standar, isi parameter &amp; body manual.
      </p>
      <div className="grid gap-3">
        {routes.map((r) => (
          <RouteRow key={`${r.verb}-${r.uri}`} route={r} />
        ))}
      </div>
    </div>
  )
}

function RouteRow({ route }: { route: ConsoleRoute }) {
  const paramNames = [...route.uri.matchAll(/\{([^}]+)\}/g)].map((m) => m[1])
  const [params, setParams] = useState<Record<string, string>>({})
  const [body, setBody] = useState('{}')
  const [response, setResponse] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const hasBody = route.verb === 'post' || route.verb === 'put' || route.verb === 'patch'

  async function send() {
    setIsLoading(true)
    setResponse(null)
    try {
      let resolvedUri = route.uri
      for (const p of paramNames) resolvedUri = resolvedUri.replace(`{${p}}`, params[p] ?? '')
      const config = hasBody ? JSON.parse(body || '{}') : undefined
      const res = await apiClient.request({ method: route.verb, url: `/${resolvedUri}`, data: config })
      setResponse(JSON.stringify(res.data, null, 2))
    } catch (err) {
      const e = err as { response?: { data?: unknown }; message?: string }
      setResponse(JSON.stringify(e.response?.data ?? { error: e.message }, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-lg border p-3">
      <div className="mb-2 flex items-center gap-2">
        <Badge variant="outline" className="uppercase">
          {route.verb}
        </Badge>
        <code className="text-xs">/{route.uri}</code>
      </div>
      {paramNames.length > 0 && (
        <div className="mb-2 grid grid-cols-2 gap-2">
          {paramNames.map((p) => (
            <div key={p} className="grid gap-1">
              <Label htmlFor={p} className="text-xs">
                {p}
              </Label>
              <Input
                id={p}
                value={params[p] ?? ''}
                onChange={(e) => setParams({ ...params, [p]: e.target.value })}
              />
            </div>
          ))}
        </div>
      )}
      {hasBody && (
        <div className="mb-2 grid gap-1">
          <Label className="text-xs">Body (JSON)</Label>
          <textarea
            className="border-input rounded-md border px-2 py-1 font-mono text-xs"
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      )}
      <Button type="button" size="sm" onClick={() => void send()} disabled={isLoading}>
        {isLoading ? 'Mengirim...' : 'Kirim'}
      </Button>
      {response && (
        <pre className="bg-muted mt-2 max-h-64 overflow-auto rounded-md p-2 text-xs">{response}</pre>
      )}
    </div>
  )
}
