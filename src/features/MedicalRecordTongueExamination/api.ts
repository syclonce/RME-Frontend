import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TongueExamination } from './types'

export const MedicalRecordTongueExaminationEndpoint = '/tongue-examinations'

export function useTongueExaminationResource() {
  return useCrudResource<TongueExamination>(MedicalRecordTongueExaminationEndpoint)
}
