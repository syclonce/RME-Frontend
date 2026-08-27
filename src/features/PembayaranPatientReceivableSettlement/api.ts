import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PatientReceivableSettlement } from './types'

export const PembayaranPatientReceivableSettlementEndpoint = '/patient-receivable-settlements'

export function usePatientReceivableSettlementResource() {
  return useCrudResource<PatientReceivableSettlement>(PembayaranPatientReceivableSettlementEndpoint)
}
