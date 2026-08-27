import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientType } from './types'

export const GeneralPatientTypeEndpoint = '/patient-types'

export function usePatientTypeResource() {
  return useCrudResource<PatientType>(GeneralPatientTypeEndpoint)
}
