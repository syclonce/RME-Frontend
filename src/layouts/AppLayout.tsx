import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, LogOut, Settings } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { useAuth } from '@/contexts/AuthContext'
import { TabsProvider, useTabs } from '@/contexts/TabsContext'
import { AccountSettingsDialog } from '@/features/Auth/pages/AccountSettingsDialog'
import { TabContent } from '@/layouts/TabContent'
import { TabStrip } from '@/layouts/TabStrip'
import { appRoutes } from '@/routes/appRoutes'
import { domainIconOf } from '@/shared/domainIcons'
import { domainPrefixOf, humanizeDomain, humanizeModuleName } from '@/shared/labels'

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function routeDisplayName(route: { module: string; label?: string }): string {
  return route.label ?? humanizeModuleName(route.module)
}

function AppSidebarUser() {
  const { user, logout } = useAuth()
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {initials(user?.name ?? user?.username ?? '?')}
                </AvatarFallback>
              </Avatar>
              <span className="flex-1 truncate text-left text-sm font-medium">
                {user?.name ?? user?.username}
              </span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {initials(user?.name ?? user?.username ?? '?')}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name ?? user?.username}</span>
                  {user?.email && <span className="truncate text-xs">{user.email}</span>}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setSettingsOpen(true)}>
              <Settings />
              Pengaturan
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => void logout().then(() => navigate('/login'))}>
              <LogOut />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AccountSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function AppLayout() {
  return (
    <TabsProvider>
      <AppLayoutContent />
    </TabsProvider>
  )
}

function AppLayoutContent() {
  const [filter, setFilter] = useState('')
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  const { hasModule } = useAuth()
  const { openTab } = useTabs()

  const grouped = useMemo(() => {
    const listRoutes = appRoutes.filter(
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

  function toggleGroup(domain: string) {
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(domain)) next.delete(domain)
      else next.add(domain)
      return next
    })
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="gap-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to="/dashboard">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    R
                  </div>
                  <span className="truncate text-sm font-semibold">RME-Frontend</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <Input
            placeholder="Cari modul..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="group-data-[collapsible=icon]:hidden"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Modul</SidebarGroupLabel>
            <SidebarMenu>
              {grouped.map(([domain, routes]) => {
                const visible = q
                  ? routes.filter(
                      (r) =>
                        r.module.toLowerCase().includes(q) ||
                        routeDisplayName(r).toLowerCase().includes(q),
                    )
                  : routes
                if (visible.length === 0) return null

                // Saat ada filter pencarian, paksa semua grup terbuka
                const isOpen = q ? true : !collapsedGroups.has(domain)
                const Icon = domainIconOf(domain)
                const label = `${humanizeDomain(domain)} (${visible.length})`

                return (
                  <Collapsible
                    key={domain}
                    asChild
                    open={isOpen}
                    onOpenChange={() => {
                      if (!q) toggleGroup(domain)
                    }}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={label}>
                          <Icon />
                          <span className="truncate">{label}</span>
                          <ChevronRight className="ml-auto shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {visible.map((r) => (
                            <SidebarMenuSubItem key={r.path}>
                              <SidebarMenuSubButton onClick={() => openTab(r)}>
                                <span>{routeDisplayName(r)}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <AppSidebarUser />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-[50px] shrink-0 items-center gap-2 border-b px-3">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <TabStrip />
        </header>
        <div className="flex-1 overflow-y-auto">
          <TabContent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
