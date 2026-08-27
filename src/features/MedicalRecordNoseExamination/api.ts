import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { NoseExamination } from './types'

export const MedicalRecordNoseExaminationEndpoint = '/nose-examinations'

export function useNoseExaminationResource() {
  return useCrudResource<NoseExamination>(MedicalRecordNoseExaminationEndpoint)
}
