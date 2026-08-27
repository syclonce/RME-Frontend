import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TreatmentProtocolStep } from './types'

export const LayananTreatmentProtocolStepEndpoint = '/treatment-protocol-steps'

export function useTreatmentProtocolStepResource() {
  return useCrudResource<TreatmentProtocolStep>(LayananTreatmentProtocolStepEndpoint)
}
