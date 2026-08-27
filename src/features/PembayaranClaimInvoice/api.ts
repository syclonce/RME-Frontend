import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ClaimInvoice } from './types'

export const PembayaranClaimInvoiceEndpoint = '/claim-invoices'

export function useClaimInvoiceResource() {
  return useCrudResource<ClaimInvoice>(PembayaranClaimInvoiceEndpoint)
}
