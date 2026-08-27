import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryItemSerialNumber } from './types'

export const InventoryItemSerialNumberEndpoint = '/inventoryitemserialnumbers'

export function useInventoryItemSerialNumberResource() {
  return useCrudResource<InventoryItemSerialNumber>(InventoryItemSerialNumberEndpoint)
}
