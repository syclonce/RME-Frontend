import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EarExamination } from './types'

export const MedicalRecordEarExaminationEndpoint = '/ear-examinations'

export function useEarExaminationResource() {
  return useCrudResource<EarExamination>(MedicalRecordEarExaminationEndpoint)
}
