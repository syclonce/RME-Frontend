import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FingerExamination } from './types'

export const MedicalRecordFingerExaminationEndpoint = '/finger-examinations'

export function useFingerExaminationResource() {
  return useCrudResource<FingerExamination>(MedicalRecordFingerExaminationEndpoint)
}
