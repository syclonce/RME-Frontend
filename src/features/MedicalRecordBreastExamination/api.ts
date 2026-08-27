import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BreastExamination } from './types'

export const MedicalRecordBreastExaminationEndpoint = '/breast-examinations'

export function useBreastExaminationResource() {
  return useCrudResource<BreastExamination>(MedicalRecordBreastExaminationEndpoint)
}
