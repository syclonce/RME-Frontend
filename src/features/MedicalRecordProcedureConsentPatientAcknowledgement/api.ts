import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ProcedureConsentPatientAcknowledgement } from './types'

export const MedicalRecordProcedureConsentPatientAcknowledgementEndpoint = '/procedure-consent-patient-acks'

export function useProcedureConsentPatientAcknowledgementResource() {
  return useCrudResource<ProcedureConsentPatientAcknowledgement>(MedicalRecordProcedureConsentPatientAcknowledgementEndpoint)
}
