import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { CaseManagerAssessment } from './types'

export const MedicalRecordCaseManagerAssessmentEndpoint = '/case-manager-assessments'

export function useCaseManagerAssessmentResource() {
  return useCrudResource<CaseManagerAssessment>(MedicalRecordCaseManagerAssessmentEndpoint)
}
