export interface InventoryStockOpnameItem {
  id: number
  stock_opname_id: number | null
  item_id: number | null
  system_quantity: number | null
  physical_quantity: number | null
  created_at?: string
  updated_at?: string
  difference?: number | null
}

export interface InventoryStockOpnameItemFormValues {
  stock_opname_id?: number | null
  item_id?: number | null
  system_quantity?: number | null
  physical_quantity?: number | null
}
