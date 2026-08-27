import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InvoiceType } from './types'

export const GeneralInvoiceTypeEndpoint = '/invoice-types'

export function useInvoiceTypeResource() {
  return useCrudResource<InvoiceType>(GeneralInvoiceTypeEndpoint)
}
