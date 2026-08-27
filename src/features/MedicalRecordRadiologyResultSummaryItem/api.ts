import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RadiologyResultSummaryItem } from './types'

export const MedicalRecordRadiologyResultSummaryItemEndpoint = '/radiology-result-summary-items'

export function useRadiologyResultSummaryItemResource() {
  return useCrudResource<RadiologyResultSummaryItem>(MedicalRecordRadiologyResultSummaryItemEndpoint)
}
