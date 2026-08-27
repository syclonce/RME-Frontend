import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { CoughAssessment } from './types'

export const MedicalRecordCoughAssessmentEndpoint = '/cough-assessments'

export function useCoughAssessmentResource() {
  return useCrudResource<CoughAssessment>(MedicalRecordCoughAssessmentEndpoint)
}
