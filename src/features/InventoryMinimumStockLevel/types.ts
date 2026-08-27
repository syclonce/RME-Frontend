export interface InventoryMinimumStockLevel {
  id: number
  item_id: number | null
  ward_id?: number | null
  minimum_quantity: number | null
  created_at?: string
  updated_at?: string
}

export interface InventoryMinimumStockLevelFormValues {
  item_id?: number | null
  ward_id?: number | null
  minimum_quantity?: number | null
}
