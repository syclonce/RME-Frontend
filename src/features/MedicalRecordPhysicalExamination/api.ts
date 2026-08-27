import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PhysicalExamination } from './types'

export const MedicalRecordPhysicalExaminationEndpoint = '/physical-examinations'

export function usePhysicalExaminationResource() {
  return useCrudResource<PhysicalExamination>(MedicalRecordPhysicalExaminationEndpoint)
}
