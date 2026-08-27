import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReportTypeItem } from './types'

export const GeneralReportTypeItemEndpoint = '/report-type-items'

export function useReportTypeItemResource() {
  return useCrudResource<ReportTypeItem>(GeneralReportTypeItemEndpoint)
}
