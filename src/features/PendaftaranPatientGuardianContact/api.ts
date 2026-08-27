import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientGuardianContact } from './types'

export const PendaftaranPatientGuardianContactEndpoint = '/patient-guardian-contacts'

export function usePatientGuardianContactResource() {
  return useCrudResource<PatientGuardianContact>(PendaftaranPatientGuardianContactEndpoint)
}
