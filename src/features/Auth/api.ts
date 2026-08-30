import { useQuery } from '@tanstack/react-query'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { apiClient } from '@/api/client'
import type { User } from './types'
import { normalizeList } from '@/shared/types'

export const AuthEndpoint = '/users'

export function useUserResource() {
  return useCrudResource<User>(AuthEndpoint)
}

export function useUserRoles(userId: number | undefined) {
  return useQuery({
    queryKey: [AuthEndpoint, userId, 'roles'],
    queryFn: async () => {
      const res = await apiClient.get(`/users/${userId}/roles`)
      return (res.data?.roles ?? []) as string[]
    },
    enabled: userId !== undefined,
  })
}

export function useRoleList() {
  return useQuery({
    queryKey: ['/roles', 'all'],
    queryFn: async () => {
      const names: string[] = []
      let page = 1
      let lastPage = 1
      do {
        const res = await apiClient.get('/roles', { params: { page } })
        const normalized = normalizeList<{ id: number; name: string }>(res.data)
        names.push(...normalized.items.map((role) => role.name))
        lastPage = normalized.lastPage
        page += 1
      } while (page <= lastPage)
      return names
    },
    staleTime: 60_000,
  })
}
