import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { UpperArmExamination } from './types'

export const MedicalRecordUpperArmExaminationEndpoint = '/upper-arm-examinations'

export function useUpperArmExaminationResource() {
  return useCrudResource<UpperArmExamination>(MedicalRecordUpperArmExaminationEndpoint)
}
