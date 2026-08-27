import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EpfraAssessment } from './types'

export const MedicalRecordEpfraAssessmentEndpoint = '/epfra-assessments'

export function useEpfraAssessmentResource() {
  return useCrudResource<EpfraAssessment>(MedicalRecordEpfraAssessmentEndpoint)
}
