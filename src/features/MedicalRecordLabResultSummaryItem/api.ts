import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabResultSummaryItem } from './types'

export const MedicalRecordLabResultSummaryItemEndpoint = '/lab-result-summary-items'

export function useLabResultSummaryItemResource() {
  return useCrudResource<LabResultSummaryItem>(MedicalRecordLabResultSummaryItemEndpoint)
}
