import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PreAnesthesiaSedationAssessment } from './types'

export const MedicalRecordPreAnesthesiaSedationAssessmentEndpoint = '/pre-anesthesia-sedation-assessments'

export function usePreAnesthesiaSedationAssessmentResource() {
  return useCrudResource<PreAnesthesiaSedationAssessment>(MedicalRecordPreAnesthesiaSedationAssessmentEndpoint)
}
