import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ToenailExamination } from './types'

export const MedicalRecordToenailExaminationEndpoint = '/toenail-examinations'

export function useToenailExaminationResource() {
  return useCrudResource<ToenailExamination>(MedicalRecordToenailExaminationEndpoint)
}
