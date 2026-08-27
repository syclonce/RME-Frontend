export interface InventoryStockRequestItem {
  id: number
  stock_request_id: number | null
  item_id: number | null
  quantity: number | null
  created_at?: string
  updated_at?: string
}

export interface InventoryStockRequestItemFormValues {
  stock_request_id?: number | null
  item_id?: number | null
  quantity?: number | null
}
