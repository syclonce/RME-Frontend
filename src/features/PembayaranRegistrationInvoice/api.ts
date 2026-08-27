import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RegistrationInvoice } from './types'

export const PembayaranRegistrationInvoiceEndpoint = '/registration-invoices'

export function useRegistrationInvoiceResource() {
  return useCrudResource<RegistrationInvoice>(PembayaranRegistrationInvoiceEndpoint)
}
