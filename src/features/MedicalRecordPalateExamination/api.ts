import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PalateExamination } from './types'

export const MedicalRecordPalateExaminationEndpoint = '/palate-examinations'

export function usePalateExaminationResource() {
  return useCrudResource<PalateExamination>(MedicalRecordPalateExaminationEndpoint)
}
