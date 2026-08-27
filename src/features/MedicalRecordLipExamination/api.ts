import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LipExamination } from './types'

export const MedicalRecordLipExaminationEndpoint = '/lip-examinations'

export function useLipExaminationResource() {
  return useCrudResource<LipExamination>(MedicalRecordLipExaminationEndpoint)
}
