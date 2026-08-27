import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GetUpAndGoTestAssessment } from './types'

export const MedicalRecordGetUpAndGoTestAssessmentEndpoint = '/get-up-and-go-assessments'

export function useGetUpAndGoTestAssessmentResource() {
  return useCrudResource<GetUpAndGoTestAssessment>(MedicalRecordGetUpAndGoTestAssessmentEndpoint)
}
