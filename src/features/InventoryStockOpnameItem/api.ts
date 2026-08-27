import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryStockOpnameItem } from './types'

export const InventoryStockOpnameItemEndpoint = '/inventorystockopnameitems'

export function useInventoryStockOpnameItemResource() {
  return useCrudResource<InventoryStockOpnameItem>(InventoryStockOpnameItemEndpoint)
}
