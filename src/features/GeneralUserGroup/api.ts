import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { UserGroup } from './types'

export const GeneralUserGroupEndpoint = '/user-groups'

export function useUserGroupResource() {
  return useCrudResource<UserGroup>(GeneralUserGroupEndpoint)
}
