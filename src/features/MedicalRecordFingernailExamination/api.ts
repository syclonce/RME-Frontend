import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FingernailExamination } from './types'

export const MedicalRecordFingernailExaminationEndpoint = '/fingernail-examinations'

export function useFingernailExaminationResource() {
  return useCrudResource<FingernailExamination>(MedicalRecordFingernailExaminationEndpoint)
}
