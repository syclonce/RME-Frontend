import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { HumptyDumptyFallScaleAssessment } from './types'

export const MedicalRecordHumptyDumptyFallScaleAssessmentEndpoint = '/humpty-dumpty-fall-scale-assessments'

export function useHumptyDumptyFallScaleAssessmentResource() {
  return useCrudResource<HumptyDumptyFallScaleAssessment>(MedicalRecordHumptyDumptyFallScaleAssessmentEndpoint)
}
