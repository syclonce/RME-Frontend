import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryItemPrice } from './types'

export const InventoryItemPriceEndpoint = '/inventoryitemprices'

export function useInventoryItemPriceResource() {
  return useCrudResource<InventoryItemPrice>(InventoryItemPriceEndpoint)
}
