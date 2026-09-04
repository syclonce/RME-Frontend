export interface InventoryGoodsReturn {
  id: number
  supplier_id: number | null
  returned_at?: string | null
  reason: string | null
  created_at?: string
  updated_at?: string
  return_number?: string | null
  returned_by?: number | null
  status?: string | null
}

export interface InventoryGoodsReturnFormValues {
  supplier_id?: number | null
  returned_at?: string | null
  reason?: string | null
}
