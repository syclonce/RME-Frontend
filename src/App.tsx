import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { generatedRoutes } from '@/routes/generated'

function App() {
  return (
    <Suspense fallback={<p className="text-muted-foreground p-4 text-sm">Memuat halaman...</p>}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            index
            element={<p className="text-muted-foreground p-4 text-sm">Pilih modul di sisi kiri.</p>}
          />
          {generatedRoutes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
