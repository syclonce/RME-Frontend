import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { apiClient, getAuthToken, setAuthToken } from '@/api/client'

export interface AuthUser {
  id: number
  name: string
  username?: string
  email?: string
}

interface AccessSnapshot {
  modules: string[]
  permissions_by_module: Record<string, string[]>
}

interface AuthContextValue {
  user: AuthUser | null
  modules: string[]
  permissionsByModule: Record<string, string[]>
  isLoading: boolean
  hasModule: (module: string) => boolean
  hasPermission: (permission: string) => boolean
  login: (login: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [access, setAccess] = useState<AccessSnapshot>({ modules: [], permissions_by_module: {} })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      setIsLoading(false)
      return
    }
    Promise.all([apiClient.get('/me'), apiClient.get('/me/modules')])
      .then(([userResponse, accessResponse]) => {
        setUser((userResponse.data?.data ?? userResponse.data) as AuthUser)
        setAccess((accessResponse.data?.data ?? accessResponse.data) as AccessSnapshot)
      })
      .catch(() => setAuthToken(null))
      .finally(() => setIsLoading(false))
  }, [])

  async function login(loginValue: string, password: string) {
    const res = await apiClient.post('/login', { login: loginValue, password })
    setAuthToken(res.data.token)
    setUser(res.data.user)
    const accessResponse = await apiClient.get('/me/modules')
    setAccess((accessResponse.data?.data ?? accessResponse.data) as AccessSnapshot)
  }

  async function logout() {
    try {
      await apiClient.post('/logout')
    } finally {
      setAuthToken(null)
      setUser(null)
      setAccess({ modules: [], permissions_by_module: {} })
    }
  }

  const hasModule = (module: string) => access.modules.includes(module)
  const hasPermission = (permission: string) =>
    Object.values(access.permissions_by_module).some((permissions) => permissions.includes(permission))

  return (
    <AuthContext.Provider
      value={{
        user,
        modules: access.modules,
        permissionsByModule: access.permissions_by_module,
        isLoading,
        hasModule,
        hasPermission,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
