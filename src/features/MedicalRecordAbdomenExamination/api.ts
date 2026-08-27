import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AbdomenExamination } from './types'

export const MedicalRecordAbdomenExaminationEndpoint = '/abdomen-examinations'

export function useAbdomenExaminationResource() {
  return useCrudResource<AbdomenExamination>(MedicalRecordAbdomenExaminationEndpoint)
}
