import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PackageInvoiceItem } from './types'

export const PembayaranPackageInvoiceItemEndpoint = '/package-invoice-items'

export function usePackageInvoiceItemResource() {
  return useCrudResource<PackageInvoiceItem>(PembayaranPackageInvoiceItemEndpoint)
}
