import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientGuardian } from './types'

export const PendaftaranPatientGuardianEndpoint = '/patient-guardians'

export function usePatientGuardianResource() {
  return useCrudResource<PatientGuardian>(PendaftaranPatientGuardianEndpoint)
}
