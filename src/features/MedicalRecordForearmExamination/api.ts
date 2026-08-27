import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ForearmExamination } from './types'

export const MedicalRecordForearmExaminationEndpoint = '/forearm-examinations'

export function useForearmExaminationResource() {
  return useCrudResource<ForearmExamination>(MedicalRecordForearmExaminationEndpoint)
}
