import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { CatClamsExamination } from './types'

export const MedicalRecordCatClamsExaminationEndpoint = '/cat-clams-examinations'

export function useCatClamsExaminationResource() {
  return useCrudResource<CatClamsExamination>(MedicalRecordCatClamsExaminationEndpoint)
}
