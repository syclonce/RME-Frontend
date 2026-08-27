import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AnalExamination } from './types'

export const MedicalRecordAnalExaminationEndpoint = '/anal-examinations'

export function useAnalExaminationResource() {
  return useCrudResource<AnalExamination>(MedicalRecordAnalExaminationEndpoint)
}
