import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TreatmentProtocol } from './types'

export const LayananTreatmentProtocolEndpoint = '/treatment-protocols'

export function useTreatmentProtocolResource() {
  return useCrudResource<TreatmentProtocol>(LayananTreatmentProtocolEndpoint)
}
