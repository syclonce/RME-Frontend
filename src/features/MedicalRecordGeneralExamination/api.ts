import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GeneralExamination } from './types'

export const MedicalRecordGeneralExaminationEndpoint = '/general-examinations'

export function useGeneralExaminationResource() {
  return useCrudResource<GeneralExamination>(MedicalRecordGeneralExaminationEndpoint)
}
