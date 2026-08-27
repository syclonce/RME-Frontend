import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientStatus } from './types'

export const GeneralPatientStatusEndpoint = '/patient-statuses'

export function usePatientStatusResource() {
  return useCrudResource<PatientStatus>(GeneralPatientStatusEndpoint)
}
