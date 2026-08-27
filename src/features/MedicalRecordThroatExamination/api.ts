import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ThroatExamination } from './types'

export const MedicalRecordThroatExaminationEndpoint = '/throat-examinations'

export function useThroatExaminationResource() {
  return useCrudResource<ThroatExamination>(MedicalRecordThroatExaminationEndpoint)
}
