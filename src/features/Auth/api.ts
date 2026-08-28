import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { User } from './types'

export const AuthEndpoint = '/users'

export function useUserResource() {
  return useCrudResource<User>(AuthEndpoint)
}
