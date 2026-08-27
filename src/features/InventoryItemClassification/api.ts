import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryItemClassification } from './types'

export const InventoryItemClassificationEndpoint = '/inventoryitemclassifications'

export function useInventoryItemClassificationResource() {
  return useCrudResource<InventoryItemClassification>(InventoryItemClassificationEndpoint)
}
