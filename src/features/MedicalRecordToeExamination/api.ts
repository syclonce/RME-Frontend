import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ToeExamination } from './types'

export const MedicalRecordToeExaminationEndpoint = '/toe-examinations'

export function useToeExaminationResource() {
  return useCrudResource<ToeExamination>(MedicalRecordToeExaminationEndpoint)
}
