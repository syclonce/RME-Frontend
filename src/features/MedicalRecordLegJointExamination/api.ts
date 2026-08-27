import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LegJointExamination } from './types'

export const MedicalRecordLegJointExaminationEndpoint = '/leg-joint-examinations'

export function useLegJointExaminationResource() {
  return useCrudResource<LegJointExamination>(MedicalRecordLegJointExaminationEndpoint)
}
