export interface InventoryWardItemStock {
  id: number
  item_id: number | null
  ward_id: number | null
  quantity: number | null
  created_at?: string
  updated_at?: string
}

export interface InventoryWardItemStockFormValues {
  item_id?: number | null
  ward_id?: number | null
  quantity?: number | null
}
