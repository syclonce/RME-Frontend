import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReceivingItem } from './types'

export const InventoryReceivingItemEndpoint = '/receiving-items'

export function useReceivingItemResource() {
  return useCrudResource<ReceivingItem>(InventoryReceivingItemEndpoint)
}
