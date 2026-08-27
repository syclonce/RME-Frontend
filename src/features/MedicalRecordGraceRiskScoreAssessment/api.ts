import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GraceRiskScoreAssessment } from './types'

export const MedicalRecordGraceRiskScoreAssessmentEndpoint = '/grace-risk-score-assessments'

export function useGraceRiskScoreAssessmentResource() {
  return useCrudResource<GraceRiskScoreAssessment>(MedicalRecordGraceRiskScoreAssessmentEndpoint)
}
