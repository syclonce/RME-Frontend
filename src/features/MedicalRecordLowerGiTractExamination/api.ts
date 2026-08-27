import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LowerGiTractExamination } from './types'

export const MedicalRecordLowerGiTractExaminationEndpoint = '/lower-gi-examinations'

export function useLowerGiTractExaminationResource() {
  return useCrudResource<LowerGiTractExamination>(MedicalRecordLowerGiTractExaminationEndpoint)
}
