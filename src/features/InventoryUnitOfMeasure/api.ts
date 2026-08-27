import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryUnitOfMeasure } from './types'

export const InventoryUnitOfMeasureEndpoint = '/inventoryunitofmeasures'

export function useInventoryUnitOfMeasureResource() {
  return useCrudResource<InventoryUnitOfMeasure>(InventoryUnitOfMeasureEndpoint)
}
