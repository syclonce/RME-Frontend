import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { NeckExamination } from './types'

export const MedicalRecordNeckExaminationEndpoint = '/neck-examinations'

export function useNeckExaminationResource() {
  return useCrudResource<NeckExamination>(MedicalRecordNeckExaminationEndpoint)
}
