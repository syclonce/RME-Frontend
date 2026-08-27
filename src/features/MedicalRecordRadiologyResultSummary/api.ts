import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RadiologyResultSummary } from './types'

export const MedicalRecordRadiologyResultSummaryEndpoint = '/radiology-result-summaries'

export function useRadiologyResultSummaryResource() {
  return useCrudResource<RadiologyResultSummary>(MedicalRecordRadiologyResultSummaryEndpoint)
}
