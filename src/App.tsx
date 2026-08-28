import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { LoginPage } from '@/features/Auth/pages/LoginPage'
import { generatedRoutes } from '@/routes/generated'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { ModuleAccessRoute } from '@/routes/ModuleAccessRoute'
import { manualRoutes } from '@/routes/manual'

function App() {
  return (
    <Suspense fallback={<p className="text-muted-foreground p-4 text-sm">Memuat halaman...</p>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route
              index
              element={<p className="text-muted-foreground p-4 text-sm">Pilih modul di sisi kiri.</p>}
            />
            {[...generatedRoutes, ...manualRoutes].map((r) => (
              <Route
                key={r.path}
                path={r.path}
                element={<ModuleAccessRoute module={r.module}>{r.element}</ModuleAccessRoute>}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
