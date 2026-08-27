import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FunctionalAssessment } from './types'

export const MedicalRecordFunctionalAssessmentEndpoint = '/functional-assessments'

export function useFunctionalAssessmentResource() {
  return useCrudResource<FunctionalAssessment>(MedicalRecordFunctionalAssessmentEndpoint)
}
