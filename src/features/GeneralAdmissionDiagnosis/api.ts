import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AdmissionDiagnosis } from './types'

export const GeneralAdmissionDiagnosisEndpoint = '/admission-diagnoses'

export function useAdmissionDiagnosisResource() {
  return useCrudResource<AdmissionDiagnosis>(GeneralAdmissionDiagnosisEndpoint)
}
