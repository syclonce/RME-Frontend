import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Role } from './types'

export const AuthorizationEndpoint = '/roles'

export function useRoleResource() {
  return useCrudResource<Role>(AuthorizationEndpoint)
}
