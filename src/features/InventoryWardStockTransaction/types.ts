export interface InventoryWardStockTransaction {
  id: number
  ward_id: number | null
  item_id: number | null
  type: string | null
  quantity: number | null
  performed_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface InventoryWardStockTransactionFormValues {
  ward_id?: number | null
  item_id?: number | null
  type?: string | null
  quantity?: number | null
  performed_at?: string | null
  notes?: string | null
}
