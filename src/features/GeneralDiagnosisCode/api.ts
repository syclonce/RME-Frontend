import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DiagnosisCode } from './types'

export const GeneralDiagnosisCodeEndpoint = '/diagnosis-codes'

export function useDiagnosisCodeResource() {
  return useCrudResource<DiagnosisCode>(GeneralDiagnosisCodeEndpoint)
}
