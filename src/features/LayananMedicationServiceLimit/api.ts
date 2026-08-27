import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicationServiceLimit } from './types'

export const LayananMedicationServiceLimitEndpoint = '/medication-service-limits'

export function useMedicationServiceLimitResource() {
  return useCrudResource<MedicationServiceLimit>(LayananMedicationServiceLimitEndpoint)
}
