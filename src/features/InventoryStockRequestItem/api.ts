import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryStockRequestItem } from './types'

export const InventoryStockRequestItemEndpoint = '/stock-request-items'

export function useInventoryStockRequestItemResource() {
  return useCrudResource<InventoryStockRequestItem>(InventoryStockRequestItemEndpoint)
}
