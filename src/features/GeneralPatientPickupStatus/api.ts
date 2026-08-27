import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientPickupStatus } from './types'

export const GeneralPatientPickupStatusEndpoint = '/patient-pickup-statuses'

export function usePatientPickupStatusResource() {
  return useCrudResource<PatientPickupStatus>(GeneralPatientPickupStatusEndpoint)
}
