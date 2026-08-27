import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryWardItemStock } from './types'

export const InventoryWardItemStockEndpoint = '/inventorywarditemstocks'

export function useInventoryWardItemStockResource() {
  return useCrudResource<InventoryWardItemStock>(InventoryWardItemStockEndpoint)
}
