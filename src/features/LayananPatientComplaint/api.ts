import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientComplaint, PatientSurvey } from './types'

export const LayananPatientComplaintEndpoint = '/patient-complaints'
export const PatientSurveyEndpoint = '/patient-surveys'

export function usePatientComplaintResource() {
  return useCrudResource<PatientComplaint>(LayananPatientComplaintEndpoint)
}

export function usePatientSurveyResource() {
  return useCrudResource<PatientSurvey>(PatientSurveyEndpoint)
}
