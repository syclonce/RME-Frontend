import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { IncidentReport } from './types'

export const AuditIncidentReportEndpoint = '/incident-reports'

export function useIncidentReportResource() {
  return useCrudResource<IncidentReport>(AuditIncidentReportEndpoint)
}
