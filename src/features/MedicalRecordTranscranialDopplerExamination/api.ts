import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TranscranialDopplerExamination } from './types'

export const MedicalRecordTranscranialDopplerExaminationEndpoint = '/tcd-examinations'

export function useTranscranialDopplerExaminationResource() {
  return useCrudResource<TranscranialDopplerExamination>(MedicalRecordTranscranialDopplerExaminationEndpoint)
}
