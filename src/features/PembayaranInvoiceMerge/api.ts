import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InvoiceMerge } from './types'

export const PembayaranInvoiceMergeEndpoint = '/invoice-merges'

export function useInvoiceMergeResource() {
  return useCrudResource<InvoiceMerge>(PembayaranInvoiceMergeEndpoint)
}
