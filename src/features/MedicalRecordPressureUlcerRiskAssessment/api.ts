import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PressureUlcerRiskAssessment } from './types'

export const MedicalRecordPressureUlcerRiskAssessmentEndpoint = '/pressure-ulcer-risk-assessments'

export function usePressureUlcerRiskAssessmentResource() {
  return useCrudResource<PressureUlcerRiskAssessment>(MedicalRecordPressureUlcerRiskAssessmentEndpoint)
}
