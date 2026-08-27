import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientGuardianIdentityCard } from './types'

export const PendaftaranPatientGuardianIdentityCardEndpoint = '/patient-guardian-identity-cards'

export function usePatientGuardianIdentityCardResource() {
  return useCrudResource<PatientGuardianIdentityCard>(PendaftaranPatientGuardianIdentityCardEndpoint)
}
