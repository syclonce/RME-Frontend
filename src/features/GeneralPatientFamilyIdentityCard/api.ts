import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientFamilyIdentityCard } from './types'

export const GeneralPatientFamilyIdentityCardEndpoint = '/patientfamilyidentitycards'

export function usePatientFamilyIdentityCardResource() {
  return useCrudResource<PatientFamilyIdentityCard>(GeneralPatientFamilyIdentityCardEndpoint)
}
