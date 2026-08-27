import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharynxExamination } from './types'

export const MedicalRecordPharynxExaminationEndpoint = '/pharynx-examinations'

export function usePharynxExaminationResource() {
  return useCrudResource<PharynxExamination>(MedicalRecordPharynxExaminationEndpoint)
}
