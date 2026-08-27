import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientNutritionProblem } from './types'

export const MedicalRecordPatientNutritionProblemEndpoint = '/patient-nutrition-problems'

export function usePatientNutritionProblemResource() {
  return useCrudResource<PatientNutritionProblem>(MedicalRecordPatientNutritionProblemEndpoint)
}
