import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { UserType } from './types'

export const GeneralUserTypeEndpoint = '/user-types'

export function useUserTypeResource() {
  return useCrudResource<UserType>(GeneralUserTypeEndpoint)
}
