import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicationAdministrationHistory } from './types'

export const MedicalRecordMedicationAdministrationHistoryEndpoint = '/medication-admin-histories'

export function useMedicationAdministrationHistoryResource() {
  return useCrudResource<MedicationAdministrationHistory>(MedicalRecordMedicationAdministrationHistoryEndpoint)
}
