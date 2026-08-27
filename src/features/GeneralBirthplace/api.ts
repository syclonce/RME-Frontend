import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Birthplace } from './types'

export const GeneralBirthplaceEndpoint = '/birthplaces'

export function useBirthplaceResource() {
  return useCrudResource<Birthplace>(GeneralBirthplaceEndpoint)
}
