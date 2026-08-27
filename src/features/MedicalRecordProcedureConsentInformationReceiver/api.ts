import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ProcedureConsentInformationReceiver } from './types'

export const MedicalRecordProcedureConsentInformationReceiverEndpoint = '/procedure-consent-information-receivers'

export function useProcedureConsentInformationReceiverResource() {
  return useCrudResource<ProcedureConsentInformationReceiver>(MedicalRecordProcedureConsentInformationReceiverEndpoint)
}
