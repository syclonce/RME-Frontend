export interface GoodsReceipt {
  id: number
  supplier_id: number | null
  item_id: number | null
  quantity: number | null
  unit_price?: number | null
  received_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  receipt_number?: string | null
  received_by?: number | null
}

export interface GoodsReceiptFormValues {
  supplier_id?: number | null
  item_id?: number | null
  quantity?: number | null
  unit_price?: number | null
  received_at?: string | null
  notes?: string | null
}
