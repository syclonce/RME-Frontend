import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ChestExamination } from './types'

export const MedicalRecordChestExaminationEndpoint = '/chest-examinations'

export function useChestExaminationResource() {
  return useCrudResource<ChestExamination>(MedicalRecordChestExaminationEndpoint)
}
