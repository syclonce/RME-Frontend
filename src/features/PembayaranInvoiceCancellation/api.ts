import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InvoiceCancellation } from './types'

export const PembayaranInvoiceCancellationEndpoint = '/invoice-cancellations'

export function useInvoiceCancellationResource() {
  return useCrudResource<InvoiceCancellation>(PembayaranInvoiceCancellationEndpoint)
}
