import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TreatmentProtocolStepDrug } from './types'

export const LayananTreatmentProtocolStepDrugEndpoint = '/treatment-protocol-step-drugs'

export function useTreatmentProtocolStepDrugResource() {
  return useCrudResource<TreatmentProtocolStepDrug>(LayananTreatmentProtocolStepDrugEndpoint)
}
