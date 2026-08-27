import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SaleItem } from './types'

export const PenjualanSaleItemEndpoint = '/sale-items'

export function useSaleItemResource() {
  return useCrudResource<SaleItem>(PenjualanSaleItemEndpoint)
}
