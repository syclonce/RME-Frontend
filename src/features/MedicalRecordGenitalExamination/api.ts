import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GenitalExamination } from './types'

export const MedicalRecordGenitalExaminationEndpoint = '/genital-examinations'

export function useGenitalExaminationResource() {
  return useCrudResource<GenitalExamination>(MedicalRecordGenitalExaminationEndpoint)
}
