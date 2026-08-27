import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { apiClient, getAuthToken, setAuthToken } from '@/api/client'

export interface AuthUser {
  id: number
  name: string
  username?: string
  email?: string
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login: (login: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getAuthToken()
    if (!token) {
      setIsLoading(false)
      return
    }
    apiClient
      .get('/me')
      .then((res) => setUser((res.data?.data ?? res.data) as AuthUser))
      .catch(() => setAuthToken(null))
      .finally(() => setIsLoading(false))
  }, [])

  async function login(loginValue: string, password: string) {
    const res = await apiClient.post('/login', { login: loginValue, password })
    setAuthToken(res.data.token)
    setUser(res.data.user)
  }

  async function logout() {
    try {
      await apiClient.post('/logout')
    } finally {
      setAuthToken(null)
      setUser(null)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
