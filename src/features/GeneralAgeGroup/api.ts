import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AgeGroup } from './types'

export const GeneralAgeGroupEndpoint = '/age-groups'

export function useAgeGroupResource() {
  return useCrudResource<AgeGroup>(GeneralAgeGroupEndpoint)
}
