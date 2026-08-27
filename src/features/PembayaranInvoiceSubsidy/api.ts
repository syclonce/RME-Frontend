import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InvoiceSubsidy } from './types'

export const PembayaranInvoiceSubsidyEndpoint = '/invoice-subsidies'

export function useInvoiceSubsidyResource() {
  return useCrudResource<InvoiceSubsidy>(PembayaranInvoiceSubsidyEndpoint)
}
