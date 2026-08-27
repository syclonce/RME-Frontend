export interface InventoryItemSerialNumber {
  id: number
  ward_item_stock_id: number | null
  serial_number: string | null
  expiry_date?: string | null
  created_at?: string
  updated_at?: string
}

export interface InventoryItemSerialNumberFormValues {
  ward_item_stock_id?: number | null
  serial_number?: string | null
  expiry_date?: string | null
}
