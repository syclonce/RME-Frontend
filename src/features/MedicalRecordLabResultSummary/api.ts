import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabResultSummary } from './types'

export const MedicalRecordLabResultSummaryEndpoint = '/lab-result-summaries'

export function useLabResultSummaryResource() {
  return useCrudResource<LabResultSummary>(MedicalRecordLabResultSummaryEndpoint)
}
