import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DifferentialDiagnosis } from './types'

export const MedicalRecordDifferentialDiagnosisEndpoint = '/differential-diagnoses'

export function useDifferentialDiagnosisResource() {
  return useCrudResource<DifferentialDiagnosis>(MedicalRecordDifferentialDiagnosisEndpoint)
}
