import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LowerLegExamination } from './types'

export const MedicalRecordLowerLegExaminationEndpoint = '/lower-leg-examinations'

export function useLowerLegExaminationResource() {
  return useCrudResource<LowerLegExamination>(MedicalRecordLowerLegExaminationEndpoint)
}
