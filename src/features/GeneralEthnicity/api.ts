import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Ethnicity } from './types'

export const GeneralEthnicityEndpoint = '/ethnicities'

export function useEthnicityResource() {
  return useCrudResource<Ethnicity>(GeneralEthnicityEndpoint)
}
