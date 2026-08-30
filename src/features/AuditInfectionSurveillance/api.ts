import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DeviceDay, InfectionCase } from './types'

export const AuditInfectionSurveillanceEndpoint = '/device-days'
export const InfectionCaseEndpoint = '/infection-cases'

export function useDeviceDayResource() {
  return useCrudResource<DeviceDay>(AuditInfectionSurveillanceEndpoint)
}

export function useInfectionCaseResource() {
  return useCrudResource<InfectionCase>(InfectionCaseEndpoint)
}
