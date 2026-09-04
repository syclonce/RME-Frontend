import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { matchPath, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { appRoutes } from '@/routes/appRoutes'
import type { AppRoute } from '@/routes/manual'
import { humanizeModuleName } from '@/shared/labels'

const STORAGE_KEY = 'simgos.tabs.v1'

export interface OpenTab {
  id: string
  path: string
  module: string
  label: string
  pinned?: boolean
}

interface StoredTabsState {
  tabs: { id: string; path: string; module: string; label: string; pinned?: boolean }[]
  activeTabId: string | null
}

interface TabsContextValue {
  tabs: (OpenTab & { route: AppRoute })[]
  activeTabId: string | null
  openTab: (route: AppRoute) => void
  activateTab: (id: string) => void
  closeTab: (id: string) => void
  reorderTab: (draggedId: string, targetId: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function resolveRoute(path: string): AppRoute | undefined {
  return appRoutes.find((r) => matchPath({ path: r.path, end: true }, path))
}

function routeDisplayName(route: AppRoute): string {
  return route.label ?? humanizeModuleName(route.module)
}

function readStoredState(): StoredTabsState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return { tabs: [], activeTabId: null }
    const parsed = JSON.parse(raw) as StoredTabsState
    if (!Array.isArray(parsed.tabs)) return { tabs: [], activeTabId: null }
    return parsed
  } catch {
    return { tabs: [], activeTabId: null }
  }
}

export function TabsProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { hasModule } = useAuth()

  const [rawTabs, setRawTabs] = useState<OpenTab[]>(() => {
    const stored = readStoredState()
    return stored.tabs.filter((t) => resolveRoute(t.path) !== undefined)
  })
  const [activeTabId, setActiveTabId] = useState<string | null>(() => {
    const stored = readStoredState()
    return stored.activeTabId
  })

  // Auto-open Dashboard sebagai tab pertama kalau belum ada tab sama sekali
  useEffect(() => {
    if (rawTabs.length > 0) return
    const dashboardRoute = appRoutes.find((r) => r.path === '/dashboard')
    if (!dashboardRoute || !hasModule(dashboardRoute.module)) return
    const id = crypto.randomUUID()
    setRawTabs([
      { id, path: dashboardRoute.path, module: dashboardRoute.module, label: routeDisplayName(dashboardRoute), pinned: true },
    ])
    setActiveTabId(id)
    // navigate() ditunda ke microtask agar tidak batching dengan setState di atas pada commit
    // yang sama -- React Router bisa warn "update BrowserRouter while rendering" kalau sinkron.
    queueMicrotask(() => navigate(dashboardRoute.path))
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hanya jalan sekali saat tabs kosong
  }, [])

  // Sinkron: lokasi browser berubah (mis. navigate() dari dalam Form) -> update path tab AKTIF saja
  useEffect(() => {
    if (!activeTabId) return
    setRawTabs((prev) =>
      prev.map((t) => (t.id === activeTabId && t.path !== location.pathname ? { ...t, path: location.pathname } : t)),
    )
  }, [location.pathname, activeTabId])

  // Persist ke sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ tabs: rawTabs, activeTabId }))
    } catch {
      // sessionStorage tidak tersedia (mis. private mode ketat) - abaikan, tab tetap berfungsi in-memory
    }
  }, [rawTabs, activeTabId])

  function openTab(route: AppRoute) {
    const existing = rawTabs.find((t) => t.path === route.path)
    if (existing) {
      setActiveTabId(existing.id)
      navigate(existing.path)
      return
    }
    const label = routeDisplayName(route)
    const id = crypto.randomUUID()
    setRawTabs((prev) => [...prev, { id, path: route.path, module: route.module, label }])
    setActiveTabId(id)
    navigate(route.path)
  }

  function activateTab(id: string) {
    const tab = rawTabs.find((t) => t.id === id)
    if (!tab) return
    setActiveTabId(id)
    navigate(tab.path)
  }

  function closeTab(id: string) {
    setRawTabs((prev) => {
      const target = prev.find((t) => t.id === id)
      if (!target || target.pinned) return prev
      const next = prev.filter((t) => t.id !== id)
      if (activeTabId === id) {
        const closedIndex = prev.findIndex((t) => t.id === id)
        const neighbor = next[closedIndex] ?? next[closedIndex - 1] ?? null
        setActiveTabId(neighbor?.id ?? null)
        if (neighbor) navigate(neighbor.path)
      }
      return next
    })
  }

  function reorderTab(draggedId: string, targetId: string) {
    if (draggedId === targetId) return
    setRawTabs((prev) => {
      const dragged = prev.find((t) => t.id === draggedId)
      const target = prev.find((t) => t.id === targetId)
      if (!dragged || !target || dragged.pinned || target.pinned) return prev
      const draggedIndex = prev.findIndex((t) => t.id === draggedId)
      const targetIndex = prev.findIndex((t) => t.id === targetId)
      const next = [...prev]
      const [moved] = next.splice(draggedIndex, 1)
      next.splice(targetIndex, 0, moved)
      return next
    })
  }

  const tabs = useMemo(
    () =>
      rawTabs
        .map((t) => {
          const route = resolveRoute(t.path)
          return route ? { ...t, route } : null
        })
        .filter((t): t is OpenTab & { route: AppRoute } => t !== null),
    [rawTabs],
  )

  return (
    <TabsContext.Provider value={{ tabs, activeTabId, openTab, activateTab, closeTab, reorderTab }}>
      {children}
    </TabsContext.Provider>
  )
}

export function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('useTabs must be used within TabsProvider')
  return ctx
}
