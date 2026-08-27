import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GoodsReceiptCancellationReason } from './types'

export const GeneralGoodsReceiptCancellationReasonEndpoint = '/goods-receipt-cancellation-reasons'

export function useGoodsReceiptCancellationReasonResource() {
  return useCrudResource<GoodsReceiptCancellationReason>(GeneralGoodsReceiptCancellationReasonEndpoint)
}
