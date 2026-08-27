import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ProcedureConsentInformationItem } from './types'

export const MedicalRecordProcedureConsentInformationItemEndpoint = '/procedure-consent-information-items'

export function useProcedureConsentInformationItemResource() {
  return useCrudResource<ProcedureConsentInformationItem>(MedicalRecordProcedureConsentInformationItemEndpoint)
}
