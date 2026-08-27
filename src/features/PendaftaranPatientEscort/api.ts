import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientEscort } from './types'

export const PendaftaranPatientEscortEndpoint = '/patient-escorts'

export function usePatientEscortResource() {
  return useCrudResource<PatientEscort>(PendaftaranPatientEscortEndpoint)
}
