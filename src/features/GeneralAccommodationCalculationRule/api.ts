import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AccommodationCalculationRule } from './types'

export const GeneralAccommodationCalculationRuleEndpoint = '/accommodation-calculation-rules'

export function useAccommodationCalculationRuleResource() {
  return useCrudResource<AccommodationCalculationRule>(GeneralAccommodationCalculationRuleEndpoint)
}
