import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryMinimumStockLevel } from './types'

export const InventoryMinimumStockLevelEndpoint = '/inventoryminimumstocklevels'

export function useInventoryMinimumStockLevelResource() {
  return useCrudResource<InventoryMinimumStockLevel>(InventoryMinimumStockLevelEndpoint)
}
