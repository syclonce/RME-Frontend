import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PainScoreAssessment } from './types'

export const MedicalRecordPainScoreAssessmentEndpoint = '/pain-score-assessments'

export function usePainScoreAssessmentResource() {
  return useCrudResource<PainScoreAssessment>(MedicalRecordPainScoreAssessmentEndpoint)
}
