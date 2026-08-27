import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientPurpose } from './types'

export const PendaftaranPatientPurposeEndpoint = '/patient-purposes'

export function usePatientPurposeResource() {
  return useCrudResource<PatientPurpose>(PendaftaranPatientPurposeEndpoint)
}
