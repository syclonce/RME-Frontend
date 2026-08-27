import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Occupation } from './types'

export const GeneralOccupationEndpoint = '/occupations'

export function useOccupationResource() {
  return useCrudResource<Occupation>(GeneralOccupationEndpoint)
}
