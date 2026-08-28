import type { ReactElement } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export function ModuleAccessRoute({ module, children }: { module: string; children: ReactElement }) {
  const { hasModule } = useAuth()

  if (!hasModule(module)) {
    return <p className="text-destructive p-6 text-sm">Anda tidak memiliki izin untuk membuka modul ini.</p>
  }

  return children
}
