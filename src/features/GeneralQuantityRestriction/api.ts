import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { QuantityRestriction } from './types'

export const GeneralQuantityRestrictionEndpoint = '/quantity-restrictions'

export function useQuantityRestrictionResource() {
  return useCrudResource<QuantityRestriction>(GeneralQuantityRestrictionEndpoint)
}
