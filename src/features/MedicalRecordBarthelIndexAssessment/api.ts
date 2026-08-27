import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BarthelIndexAssessment } from './types'

export const MedicalRecordBarthelIndexAssessmentEndpoint = '/barthel-index-assessments'

export function useBarthelIndexAssessmentResource() {
  return useCrudResource<BarthelIndexAssessment>(MedicalRecordBarthelIndexAssessmentEndpoint)
}
