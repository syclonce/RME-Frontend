import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FunctionalStatusAssessment } from './types'

export const MedicalRecordFunctionalStatusAssessmentEndpoint = '/functional-status-assessments'

export function useFunctionalStatusAssessmentResource() {
  return useCrudResource<FunctionalStatusAssessment>(MedicalRecordFunctionalStatusAssessmentEndpoint)
}
