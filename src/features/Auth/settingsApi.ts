import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'

/**
 * API untuk dialog "Pengaturan Akun" (Profil Saya, Keamanan, Sesi Aktif).
 * Backend RME-Backend tidak seragam soal wrapper `{ data: ... }`, jadi semua
 * unwrap di bawah defensif: `res.data?.data ?? res.data` (pola yang sama
 * dipakai di `AuthContext.tsx` dan `DashboardCore/api.ts`).
 */

export interface MeUser {
  id: number
  name: string
  username: string
  email: string
  is_locked?: boolean
  is_active?: boolean
  active_until?: string | null
  created_at?: string
  updated_at?: string
}

export interface UpdateMePayload {
  name?: string
  username?: string
  email?: string
}

export interface UpdatePasswordPayload {
  current_password: string
  password: string
  password_confirmation: string
}

export interface ActiveSession {
  id: number
  name: string
  last_used_at: string | null
  created_at: string
  is_current_device: boolean
}

export const MeEndpoint = '/me'
export const MeSessionsEndpoint = '/me/sessions'

export function useMeQuery() {
  return useQuery({
    queryKey: [MeEndpoint],
    queryFn: async () => {
      const res = await apiClient.get(MeEndpoint)
      return (res.data?.data ?? res.data) as MeUser
    },
  })
}

export function useUpdateMe() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: UpdateMePayload) => {
      const res = await apiClient.put(MeEndpoint, payload)
      return (res.data?.data ?? res.data) as MeUser
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [MeEndpoint] })
    },
  })
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async (payload: UpdatePasswordPayload) => {
      const res = await apiClient.put(`${MeEndpoint}/password`, payload)
      return (res.data?.data ?? res.data) as { message: string }
    },
  })
}

export function useActiveSessions(enabled = true) {
  return useQuery({
    queryKey: [MeSessionsEndpoint],
    queryFn: async () => {
      const res = await apiClient.get(MeSessionsEndpoint)
      const raw = res.data?.data ?? res.data
      return (Array.isArray(raw) ? raw : []) as ActiveSession[]
    },
    enabled,
  })
}

/**
 * Ekstrak pesan error 422 Laravel-standard dari axios error: prioritaskan
 * `errors.<field>[0]`, fallback ke `message`, lalu fallback generik.
 * Mengikuti pola yang sudah dipakai di `LoginPage.tsx`.
 */
export function extractErrorMessage(err: unknown, field?: string, fallback = 'Terjadi kesalahan.'): string {
  const response = (err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } })
    .response
  if (field && response?.data?.errors?.[field]?.[0]) {
    return response.data.errors[field][0]
  }
  if (response?.data?.errors) {
    const firstField = Object.values(response.data.errors)[0]
    if (firstField?.[0]) return firstField[0]
  }
  return response?.data?.message ?? fallback
}
