import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientFamily } from './types'

export const GeneralPatientFamilyEndpoint = '/patientfamilies'

export function usePatientFamilyResource() {
  return useCrudResource<PatientFamily>(GeneralPatientFamilyEndpoint)
}
