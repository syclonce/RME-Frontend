import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { CorporateReceivableSettlement } from './types'

export const PembayaranCorporateReceivableSettlementEndpoint = '/corporate-receivable-settlements'

export function useCorporateReceivableSettlementResource() {
  return useCrudResource<CorporateReceivableSettlement>(PembayaranCorporateReceivableSettlementEndpoint)
}
