import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { NursingDiagnosis } from './types'

export const MedicalRecordNursingDiagnosisEndpoint = '/nursing-diagnoses'

export function useNursingDiagnosisResource() {
  return useCrudResource<NursingDiagnosis>(MedicalRecordNursingDiagnosisEndpoint)
}
