import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryGoodsReturn } from './types'

export const InventoryGoodsReturnEndpoint = '/goods-returns'

export function useInventoryGoodsReturnResource() {
  return useCrudResource<InventoryGoodsReturn>(InventoryGoodsReturnEndpoint)
}
