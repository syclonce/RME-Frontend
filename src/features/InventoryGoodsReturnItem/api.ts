import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryGoodsReturnItem } from './types'

export const InventoryGoodsReturnItemEndpoint = '/goods-return-items'

export function useInventoryGoodsReturnItemResource() {
  return useCrudResource<InventoryGoodsReturnItem>(InventoryGoodsReturnItemEndpoint)
}
