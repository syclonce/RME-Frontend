import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientEscortIdentityCard } from './types'

export const PendaftaranPatientEscortIdentityCardEndpoint = '/patient-escort-identity-cards'

export function usePatientEscortIdentityCardResource() {
  return useCrudResource<PatientEscortIdentityCard>(PendaftaranPatientEscortIdentityCardEndpoint)
}
