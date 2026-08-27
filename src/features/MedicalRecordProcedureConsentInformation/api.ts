import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ProcedureConsentInformation } from './types'

export const MedicalRecordProcedureConsentInformationEndpoint = '/procedure-consent-information'

export function useProcedureConsentInformationResource() {
  return useCrudResource<ProcedureConsentInformation>(MedicalRecordProcedureConsentInformationEndpoint)
}
