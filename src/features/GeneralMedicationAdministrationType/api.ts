import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicationAdministrationType } from './types'

export const GeneralMedicationAdministrationTypeEndpoint = '/medication-administration-types'

export function useMedicationAdministrationTypeResource() {
  return useCrudResource<MedicationAdministrationType>(GeneralMedicationAdministrationTypeEndpoint)
}
