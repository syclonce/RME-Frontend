import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Diagnosis } from './types'

export const MedicalRecordDiagnosisEndpoint = '/diagnoses'

export function useDiagnosisResource() {
  return useCrudResource<Diagnosis>(MedicalRecordDiagnosisEndpoint)
}
