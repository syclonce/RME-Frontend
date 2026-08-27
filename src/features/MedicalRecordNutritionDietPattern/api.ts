import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { NutritionDietPattern } from './types'

export const MedicalRecordNutritionDietPatternEndpoint = '/nutrition-diet-patterns'

export function useNutritionDietPatternResource() {
  return useCrudResource<NutritionDietPattern>(MedicalRecordNutritionDietPatternEndpoint)
}
