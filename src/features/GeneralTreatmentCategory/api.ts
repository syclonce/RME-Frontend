import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TreatmentCategory } from './types'

export const GeneralTreatmentCategoryEndpoint = '/treatment-categories'

export function useTreatmentCategoryResource() {
  return useCrudResource<TreatmentCategory>(GeneralTreatmentCategoryEndpoint)
}
