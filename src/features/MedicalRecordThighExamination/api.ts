import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ThighExamination } from './types'

export const MedicalRecordThighExaminationEndpoint = '/thigh-examinations'

export function useThighExaminationResource() {
  return useCrudResource<ThighExamination>(MedicalRecordThighExaminationEndpoint)
}
