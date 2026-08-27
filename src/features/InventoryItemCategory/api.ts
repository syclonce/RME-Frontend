import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryItemCategory } from './types'

export const InventoryItemCategoryEndpoint = '/inventoryitemcategories'

export function useInventoryItemCategoryResource() {
  return useCrudResource<InventoryItemCategory>(InventoryItemCategoryEndpoint)
}
