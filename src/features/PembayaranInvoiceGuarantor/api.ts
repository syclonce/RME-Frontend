import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InvoiceGuarantor } from './types'

export const PembayaranInvoiceGuarantorEndpoint = '/invoice-guarantors'

export function useInvoiceGuarantorResource() {
  return useCrudResource<InvoiceGuarantor>(PembayaranInvoiceGuarantorEndpoint)
}
