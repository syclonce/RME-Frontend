import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicationUsageType } from './types'

export const GeneralMedicationUsageTypeEndpoint = '/medication-usage-types'

export function useMedicationUsageTypeResource() {
  return useCrudResource<MedicationUsageType>(GeneralMedicationUsageTypeEndpoint)
}
