import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TonsilExamination } from './types'

export const MedicalRecordTonsilExaminationEndpoint = '/tonsil-examinations'

export function useTonsilExaminationResource() {
  return useCrudResource<TonsilExamination>(MedicalRecordTonsilExaminationEndpoint)
}
