export interface InventoryGoodsReceiptCancellation {
  id: number
  goods_receipt_id: number | null
  reason: string | null
  cancelled_at?: string | null
  created_at?: string
  updated_at?: string
  cancellation_number?: string | null
  cancelled_by?: number | null
}

export interface InventoryGoodsReceiptCancellationFormValues {
  goods_receipt_id?: number | null
  reason?: string | null
  cancelled_at?: string | null
}
