import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { UpperGiTractExamination } from './types'

export const MedicalRecordUpperGiTractExaminationEndpoint = '/upper-gi-examinations'

export function useUpperGiTractExaminationResource() {
  return useCrudResource<UpperGiTractExamination>(MedicalRecordUpperGiTractExaminationEndpoint)
}
