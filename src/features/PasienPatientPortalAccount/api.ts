import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientPortalAccount } from './types'

export const PasienPatientPortalAccountEndpoint = '/patient-portal-accounts'

export function usePatientPortalAccountResource() {
  return useCrudResource<PatientPortalAccount>(PasienPatientPortalAccountEndpoint)
}
