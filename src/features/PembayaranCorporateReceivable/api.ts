import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { CorporateReceivable } from './types'

export const PembayaranCorporateReceivableEndpoint = '/corporate-receivables'

export function useCorporateReceivableResource() {
  return useCrudResource<CorporateReceivable>(PembayaranCorporateReceivableEndpoint)
}
