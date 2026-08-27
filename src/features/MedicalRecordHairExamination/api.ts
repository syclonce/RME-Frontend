import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { HairExamination } from './types'

export const MedicalRecordHairExaminationEndpoint = '/hair-examinations'

export function useHairExaminationResource() {
  return useCrudResource<HairExamination>(MedicalRecordHairExaminationEndpoint)
}
