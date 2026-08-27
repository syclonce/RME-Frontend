import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DischargeSummary } from './types'

export const MedicalRecordDischargeSummaryEndpoint = '/discharge-summaries'

export function useDischargeSummaryResource() {
  return useCrudResource<DischargeSummary>(MedicalRecordDischargeSummaryEndpoint)
}
