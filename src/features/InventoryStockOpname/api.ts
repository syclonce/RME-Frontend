import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryStockOpname } from './types'

export const InventoryStockOpnameEndpoint = '/inventorystockopnames'

export function useInventoryStockOpnameResource() {
  return useCrudResource<InventoryStockOpname>(InventoryStockOpnameEndpoint)
}
