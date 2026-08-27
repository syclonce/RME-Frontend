import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EegExamination } from './types'

export const MedicalRecordEegExaminationEndpoint = '/eeg-examinations'

export function useEegExaminationResource() {
  return useCrudResource<EegExamination>(MedicalRecordEegExaminationEndpoint)
}
