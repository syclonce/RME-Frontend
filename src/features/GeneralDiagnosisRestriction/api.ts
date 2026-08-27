import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DiagnosisRestriction } from './types'

export const GeneralDiagnosisRestrictionEndpoint = '/diagnosis-restrictions'

export function useDiagnosisRestrictionResource() {
  return useCrudResource<DiagnosisRestriction>(GeneralDiagnosisRestrictionEndpoint)
}
