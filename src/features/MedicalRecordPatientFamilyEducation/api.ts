import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientFamilyEducation } from './types'

export const MedicalRecordPatientFamilyEducationEndpoint = '/patient-family-educations'

export function usePatientFamilyEducationResource() {
  return useCrudResource<PatientFamilyEducation>(MedicalRecordPatientFamilyEducationEndpoint)
}
