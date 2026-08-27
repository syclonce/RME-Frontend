import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ProcedureConsentInformationGiver } from './types'

export const MedicalRecordProcedureConsentInformationGiverEndpoint = '/procedure-consent-information-givers'

export function useProcedureConsentInformationGiverResource() {
  return useCrudResource<ProcedureConsentInformationGiver>(MedicalRecordProcedureConsentInformationGiverEndpoint)
}
