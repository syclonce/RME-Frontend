import { useMemo, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { generatedRoutes } from '@/routes/generated'

function domainOf(moduleName: string): string {
  const match = moduleName.match(/^[A-Z][a-z0-9]*/)
  return match ? match[0] : 'Lainnya'
}

export function AppLayout() {
  const [filter, setFilter] = useState('')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const grouped = useMemo(() => {
    const listRoutes = generatedRoutes.filter((r) => !r.path.includes('/tambah') && !r.path.includes(':id'))
    const byDomain = new Map<string, typeof listRoutes>()
    for (const r of listRoutes) {
      const domain = domainOf(r.module)
      if (!byDomain.has(domain)) byDomain.set(domain, [])
      byDomain.get(domain)!.push(r)
    }
    return [...byDomain.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [])

  const q = filter.trim().toLowerCase()

  return (
    <div className="flex h-svh">
      <aside className="w-72 shrink-0 overflow-y-auto border-r p-3">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium">{user?.name ?? user?.username}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void logout().then(() => navigate('/login'))
            }}
          >
            Keluar
          </Button>
        </div>
        <input
          className="mb-3 w-full rounded border px-2 py-1 text-sm"
          placeholder="Cari modul..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {grouped.map(([domain, routes]) => {
          const visible = q ? routes.filter((r) => r.module.toLowerCase().includes(q)) : routes
          if (visible.length === 0) return null
          return (
            <div key={domain} className="mb-3">
              <p className="text-muted-foreground px-1 text-xs font-semibold uppercase">
                {domain} ({visible.length})
              </p>
              {visible.map((r) => (
                <Link
                  key={r.path}
                  to={r.path}
                  className="hover:bg-accent block truncate rounded px-2 py-1 text-sm"
                  title={r.module}
                >
                  {r.module}
                </Link>
              ))}
            </div>
          )
        })}
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
