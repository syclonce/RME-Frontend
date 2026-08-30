import { useQuery } from '@tanstack/react-query'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { apiClient } from '@/api/client'
import type { Role, Permission } from './types'
import { normalizeList } from '@/shared/types'

export const AuthorizationEndpoint = '/roles'
export const PermissionEndpoint = '/permissions'

export function useRoleResource() {
  return useCrudResource<Role>(AuthorizationEndpoint)
}

export function usePermissionResource() {
  return useCrudResource<Permission>(PermissionEndpoint)
}

export function usePermissionList() {
  return useQuery({
    queryKey: [PermissionEndpoint, 'all'],
    queryFn: async () => {
      const permissions: Permission[] = []
      let page = 1
      let lastPage = 1
      do {
        const res = await apiClient.get(PermissionEndpoint, { params: { page } })
        const normalized = normalizeList<Permission>(res.data)
        permissions.push(...normalized.items)
        lastPage = normalized.lastPage
        page += 1
      } while (page <= lastPage)
      return permissions
    },
    staleTime: 60_000,
  })
}
