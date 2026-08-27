import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Item } from './types'

export const InventoryItemEndpoint = '/items'

export function useItemResource() {
  return useCrudResource<Item>(InventoryItemEndpoint)
}
