import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InvoiceItem } from './types'

export const PembayaranInvoiceItemEndpoint = '/invoice-items'

export function useInvoiceItemResource() {
  return useCrudResource<InvoiceItem>(PembayaranInvoiceItemEndpoint)
}
