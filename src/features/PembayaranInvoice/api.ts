import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Invoice } from './types'

export const PembayaranInvoiceEndpoint = '/invoices'

export function useInvoiceResource() {
  return useCrudResource<Invoice>(PembayaranInvoiceEndpoint)
}
