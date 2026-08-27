import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FoodAllergenExamination } from './types'

export const MedicalRecordFoodAllergenExaminationEndpoint = '/food-allergen-examinations'

export function useFoodAllergenExaminationResource() {
  return useCrudResource<FoodAllergenExamination>(MedicalRecordFoodAllergenExaminationEndpoint)
}
