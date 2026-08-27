import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientEscortContact } from './types'

export const PendaftaranPatientEscortContactEndpoint = '/patient-escort-contacts'

export function usePatientEscortContactResource() {
  return useCrudResource<PatientEscortContact>(PendaftaranPatientEscortContactEndpoint)
}
