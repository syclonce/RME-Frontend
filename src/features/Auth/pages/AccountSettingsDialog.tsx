import { useState } from 'react'
import { KeyRound, MonitorSmartphone, UserRound } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { ProfilePanel } from '@/features/Auth/pages/settings/ProfilePanel'
import { SecurityPanel } from '@/features/Auth/pages/settings/SecurityPanel'
import { SessionsPanel } from '@/features/Auth/pages/settings/SessionsPanel'

const navItems = [
  { key: 'profile', name: 'Profil Saya', icon: UserRound, Panel: ProfilePanel },
  { key: 'security', name: 'Keamanan', icon: KeyRound, Panel: SecurityPanel },
  { key: 'sessions', name: 'Sesi Aktif', icon: MonitorSmartphone, Panel: SessionsPanel },
] as const

interface AccountSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccountSettingsDialog({ open, onOpenChange }: AccountSettingsDialogProps) {
  const [activeKey, setActiveKey] = useState<(typeof navItems)[number]['key']>('profile')
  const active = navItems.find((item) => item.key === activeKey) ?? navItems[0]
  const ActivePanel = active.Panel

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Pengaturan</DialogTitle>
        <DialogDescription className="sr-only">Kelola profil, keamanan, dan sesi aktif akun Anda.</DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navItems.map((item) => (
                      <SidebarMenuItem key={item.key}>
                        <SidebarMenuButton
                          isActive={item.key === activeKey}
                          onClick={() => setActiveKey(item.key)}
                        >
                          <item.icon />
                          <span className="truncate">{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Pengaturan</BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{active.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              <ActivePanel />
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
