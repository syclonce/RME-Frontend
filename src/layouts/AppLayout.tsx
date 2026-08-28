import { useMemo, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/AuthContext'
import { generatedRoutes } from '@/routes/generated'
import { manualRoutes } from '@/routes/manual'
import { domainPrefixOf, humanizeDomain, humanizeModuleName } from '@/shared/labels'

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function AppLayout() {
  const [filter, setFilter] = useState('')
  const { user, logout, hasModule } = useAuth()
  const navigate = useNavigate()

  const grouped = useMemo(() => {
    const listRoutes = [...generatedRoutes, ...manualRoutes].filter(
      (r) => !r.path.includes('/tambah') && !r.path.includes('/:') && hasModule(r.module),
    )
    const byDomain = new Map<string, typeof listRoutes>()
    for (const r of listRoutes) {
      const domain = domainPrefixOf(r.module)
      if (!byDomain.has(domain)) byDomain.set(domain, [])
      byDomain.get(domain)!.push(r)
    }
    return [...byDomain.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [hasModule])

  const q = filter.trim().toLowerCase()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="gap-2 p-3">
          <div className="flex items-center gap-2 px-1">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 items-center justify-center rounded-md font-semibold">
              R
            </div>
            <span className="text-sm font-semibold">RME-Frontend</span>
          </div>
          <Input placeholder="Cari modul..." value={filter} onChange={(e) => setFilter(e.target.value)} />
        </SidebarHeader>
        <SidebarContent>
          {grouped.map(([domain, routes]) => {
            const visible = q
              ? routes.filter(
                  (r) =>
                    r.module.toLowerCase().includes(q) || humanizeModuleName(r.module).toLowerCase().includes(q),
                )
              : routes
            if (visible.length === 0) return null
            return (
              <SidebarGroup key={domain}>
                <SidebarGroupLabel>
                  {humanizeDomain(domain)} ({visible.length})
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {visible.map((r) => (
                      <SidebarMenuItem key={r.path}>
                        <SidebarMenuButton asChild tooltip={r.module}>
                          <Link to={r.path}>{humanizeModuleName(r.module)}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
          })}
        </SidebarContent>
        <SidebarFooter className="gap-2 border-t p-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarFallback>{initials(user?.name ?? user?.username ?? '?')}</AvatarFallback>
            </Avatar>
            <span className="flex-1 truncate text-sm font-medium">{user?.name ?? user?.username}</span>
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
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
          <SidebarTrigger />
        </header>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
