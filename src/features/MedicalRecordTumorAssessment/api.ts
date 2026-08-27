import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TumorAssessment } from './types'

export const MedicalRecordTumorAssessmentEndpoint = '/tumor-assessments'

export function useTumorAssessmentResource() {
  return useCrudResource<TumorAssessment>(MedicalRecordTumorAssessmentEndpoint)
}
