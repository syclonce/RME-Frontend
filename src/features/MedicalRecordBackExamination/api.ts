import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BackExamination } from './types'

export const MedicalRecordBackExaminationEndpoint = '/back-examinations'

export function useBackExaminationResource() {
  return useCrudResource<BackExamination>(MedicalRecordBackExaminationEndpoint)
}
