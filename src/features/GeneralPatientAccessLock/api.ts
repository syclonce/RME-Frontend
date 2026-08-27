import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientAccessLock } from './types'

export const GeneralPatientAccessLockEndpoint = '/patient-access-locks'

export function usePatientAccessLockResource() {
  return useCrudResource<PatientAccessLock>(GeneralPatientAccessLockEndpoint)
}
