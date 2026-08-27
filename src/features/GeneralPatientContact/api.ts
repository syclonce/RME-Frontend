import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientContact } from './types'

export const GeneralPatientContactEndpoint = '/patient-contacts'

export function usePatientContactResource() {
  return useCrudResource<PatientContact>(GeneralPatientContactEndpoint)
}
