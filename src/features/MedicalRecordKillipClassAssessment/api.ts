import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { KillipClassAssessment } from './types'

export const MedicalRecordKillipClassAssessmentEndpoint = '/killip-class-assessments'

export function useKillipClassAssessmentResource() {
  return useCrudResource<KillipClassAssessment>(MedicalRecordKillipClassAssessmentEndpoint)
}
