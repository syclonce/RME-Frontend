import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DeviceDay } from './types'

export const AuditInfectionSurveillanceEndpoint = '/device-days'

export function useDeviceDayResource() {
  return useCrudResource<DeviceDay>(AuditInfectionSurveillanceEndpoint)
}
