import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { IntradialyticHdMonitoring } from './types'

export const MedicalRecordIntradialyticHdMonitoringEndpoint = '/intradialytic-hd-monitorings'

export function useIntradialyticHdMonitoringResource() {
  return useCrudResource<IntradialyticHdMonitoring>(MedicalRecordIntradialyticHdMonitoringEndpoint)
}
