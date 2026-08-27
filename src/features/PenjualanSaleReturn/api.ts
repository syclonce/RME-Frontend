import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SaleReturn } from './types'

export const PenjualanSaleReturnEndpoint = '/sale-returns'

export function useSaleReturnResource() {
  return useCrudResource<SaleReturn>(PenjualanSaleReturnEndpoint)
}
