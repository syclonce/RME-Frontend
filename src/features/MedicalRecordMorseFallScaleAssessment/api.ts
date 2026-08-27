import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MorseFallScaleAssessment } from './types'

export const MedicalRecordMorseFallScaleAssessmentEndpoint = '/morse-fall-scale-assessments'

export function useMorseFallScaleAssessmentResource() {
  return useCrudResource<MorseFallScaleAssessment>(MedicalRecordMorseFallScaleAssessmentEndpoint)
}
