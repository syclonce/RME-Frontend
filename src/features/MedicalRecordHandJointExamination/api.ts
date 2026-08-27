import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { HandJointExamination } from './types'

export const MedicalRecordHandJointExaminationEndpoint = '/hand-joint-examinations'

export function useHandJointExaminationResource() {
  return useCrudResource<HandJointExamination>(MedicalRecordHandJointExaminationEndpoint)
}
