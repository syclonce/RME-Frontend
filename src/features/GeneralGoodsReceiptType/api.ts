import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GoodsReceiptType } from './types'

export const GeneralGoodsReceiptTypeEndpoint = '/goods-receipt-types'

export function useGoodsReceiptTypeResource() {
  return useCrudResource<GoodsReceiptType>(GeneralGoodsReceiptTypeEndpoint)
}
