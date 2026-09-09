import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientIdentityCard } from './types'

export const GeneralPatientIdentityCardEndpoint = '/patientidentitycards'

export function usePatientIdentityCardResource() {
  return useCrudResource<PatientIdentityCard>(GeneralPatientIdentityCardEndpoint)
}
