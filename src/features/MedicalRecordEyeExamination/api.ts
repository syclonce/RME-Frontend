import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EyeExamination } from './types'

export const MedicalRecordEyeExaminationEndpoint = '/eye-examinations'

export function useEyeExaminationResource() {
  return useCrudResource<EyeExamination>(MedicalRecordEyeExaminationEndpoint)
}
