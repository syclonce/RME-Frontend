import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { LoginPage } from '@/features/Auth/pages/LoginPage'
import { ProtectedRoute } from '@/routes/ProtectedRoute'

/**
 * Halaman pratinjau komponen, hanya saat dev.
 *
 * Dimuat lewat lazy(), bukan import statis: import statis tetap menyeret
 * modulnya ke graf produksi walau rutenya dijaga `import.meta.env.DEV`, dan
 * hanya selamat karena tree-shaking kebetulan berhasil. lazy() memutus
 * tautannya secara struktural — halaman dev tidak dapat membebani bundel yang
 * dimuat petugas, apa pun yang terjadi pada konfigurasi build.
 */
const DashboardPreviewPage = lazy(() =>
  import('@/dev/DashboardPreviewPage').then((m) => ({ default: m.DashboardPreviewPage })),
)

function App() {
  return (
    <Suspense fallback={<p className="text-muted-foreground p-4 text-sm">Memuat halaman...</p>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Pratinjau komponen, hanya saat dev — tidak ikut ke bundel produksi. */}
        {import.meta.env.DEV && (
          <Route path="/__preview/dashboard" element={<DashboardPreviewPage />} />
        )}
        <Route element={<ProtectedRoute />}>
          <Route path="*" element={<AppLayout />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
