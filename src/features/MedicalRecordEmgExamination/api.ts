import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EmgExamination } from './types'

export const MedicalRecordEmgExaminationEndpoint = '/emg-examinations'

export function useEmgExaminationResource() {
  return useCrudResource<EmgExamination>(MedicalRecordEmgExaminationEndpoint)
}
