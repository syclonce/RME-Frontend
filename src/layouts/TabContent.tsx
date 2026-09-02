import { cloneElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useTabs } from '@/contexts/TabsContext'
import { ModuleAccessRoute } from '@/routes/ModuleAccessRoute'

export function TabContent() {
  const { tabs, activeTabId } = useTabs()

  if (tabs.length === 0) {
    return <p className="text-muted-foreground p-4 text-sm">Pilih modul di sisi kiri.</p>
  }

  return (
    <>
      {tabs.map((tab) => (
        <div key={tab.id} style={{ display: tab.id === activeTabId ? 'contents' : 'none' }}>
          <Routes location={{ pathname: tab.path }}>
            <Route
              path={tab.route.path}
              element={
                <ModuleAccessRoute module={tab.module}>
                  {cloneElement(tab.route.element, { key: tab.id })}
                </ModuleAccessRoute>
              }
            />
          </Routes>
        </div>
      ))}
    </>
  )
}
