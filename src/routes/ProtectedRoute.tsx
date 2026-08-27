import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <p className="text-muted-foreground p-4 text-sm">Memuat sesi...</p>
  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}
