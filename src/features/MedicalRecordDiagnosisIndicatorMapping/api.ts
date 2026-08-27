import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DiagnosisIndicatorMapping } from './types'

export const MedicalRecordDiagnosisIndicatorMappingEndpoint = '/diagnosis-indicator-mappings'

export function useDiagnosisIndicatorMappingResource() {
  return useCrudResource<DiagnosisIndicatorMapping>(MedicalRecordDiagnosisIndicatorMappingEndpoint)
}
