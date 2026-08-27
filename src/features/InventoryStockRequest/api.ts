import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { StockRequest } from './types'

export const InventoryStockRequestEndpoint = '/stock-requests'

export function useStockRequestResource() {
  return useCrudResource<StockRequest>(InventoryStockRequestEndpoint)
}
