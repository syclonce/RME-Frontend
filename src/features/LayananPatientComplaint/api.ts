import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientComplaint } from './types'

export const LayananPatientComplaintEndpoint = '/patient-complaints'

export function usePatientComplaintResource() {
  return useCrudResource<PatientComplaint>(LayananPatientComplaintEndpoint)
}
