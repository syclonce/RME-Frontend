import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { HeadExamination } from './types'

export const MedicalRecordHeadExaminationEndpoint = '/head-examinations'

export function useHeadExaminationResource() {
  return useCrudResource<HeadExamination>(MedicalRecordHeadExaminationEndpoint)
}
