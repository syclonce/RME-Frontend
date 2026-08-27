export interface InventoryGoodsReturn {
  id: number
  supplier_id: number | null
  returned_at?: string | null
  reason: string | null
  created_at?: string
  updated_at?: string
}

export interface InventoryGoodsReturnFormValues {
  supplier_id?: number | null
  returned_at?: string | null
  reason?: string | null
}
