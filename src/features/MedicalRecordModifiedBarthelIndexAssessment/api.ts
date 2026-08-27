import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ModifiedBarthelIndexAssessment } from './types'

export const MedicalRecordModifiedBarthelIndexAssessmentEndpoint = '/modified-barthel-index-assessments'

export function useModifiedBarthelIndexAssessmentResource() {
  return useCrudResource<ModifiedBarthelIndexAssessment>(MedicalRecordModifiedBarthelIndexAssessmentEndpoint)
}
