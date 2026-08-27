import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicationIteration } from './types'

export const LayananMedicationIterationEndpoint = '/medication-iterations'

export function useMedicationIterationResource() {
  return useCrudResource<MedicationIteration>(LayananMedicationIterationEndpoint)
}
