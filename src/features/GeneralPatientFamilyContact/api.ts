import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientFamilyContact } from './types'

export const GeneralPatientFamilyContactEndpoint = '/patientfamilycontacts'

export function usePatientFamilyContactResource() {
  return useCrudResource<PatientFamilyContact>(GeneralPatientFamilyContactEndpoint)
}
