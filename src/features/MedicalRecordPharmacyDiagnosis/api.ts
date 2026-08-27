import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyDiagnosis } from './types'

export const MedicalRecordPharmacyDiagnosisEndpoint = '/pharmacy-diagnoses'

export function usePharmacyDiagnosisResource() {
  return useCrudResource<PharmacyDiagnosis>(MedicalRecordPharmacyDiagnosisEndpoint)
}
