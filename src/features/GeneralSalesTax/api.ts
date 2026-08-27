import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SalesTax } from './types'

export const GeneralSalesTaxEndpoint = '/sales-taxes'

export function useSalesTaxResource() {
  return useCrudResource<SalesTax>(GeneralSalesTaxEndpoint)
}
