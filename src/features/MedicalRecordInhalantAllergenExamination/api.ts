import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InhalantAllergenExamination } from './types'

export const MedicalRecordInhalantAllergenExaminationEndpoint = '/inhalant-allergen-examinations'

export function useInhalantAllergenExaminationResource() {
  return useCrudResource<InhalantAllergenExamination>(MedicalRecordInhalantAllergenExaminationEndpoint)
}
