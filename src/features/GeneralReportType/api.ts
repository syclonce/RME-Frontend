import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReportType } from './types'

export const GeneralReportTypeEndpoint = '/report-types'

export function useReportTypeResource() {
  return useCrudResource<ReportType>(GeneralReportTypeEndpoint)
}
