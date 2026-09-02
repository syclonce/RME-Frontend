import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { LoginPage } from '@/features/Auth/pages/LoginPage'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

function App() {
  return (
    <Suspense fallback={<p className="text-muted-foreground p-4 text-sm">Memuat halaman...</p>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="*" element={<AppLayout />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
