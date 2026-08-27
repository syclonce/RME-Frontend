import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PhysicalAssessment } from './types'

export const MedicalRecordPhysicalAssessmentEndpoint = '/physical-assessments'

export function usePhysicalAssessmentResource() {
  return useCrudResource<PhysicalAssessment>(MedicalRecordPhysicalAssessmentEndpoint)
}
