import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryGoodsReceiptCancellation } from './types'

export const InventoryGoodsReceiptCancellationEndpoint = '/goods-receipt-cancellations'

export function useInventoryGoodsReceiptCancellationResource() {
  return useCrudResource<InventoryGoodsReceiptCancellation>(InventoryGoodsReceiptCancellationEndpoint)
}
