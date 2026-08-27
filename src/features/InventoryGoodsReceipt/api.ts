import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GoodsReceipt } from './types'

export const InventoryGoodsReceiptEndpoint = '/goods-receipts'

export function useGoodsReceiptResource() {
  return useCrudResource<GoodsReceipt>(InventoryGoodsReceiptEndpoint)
}
