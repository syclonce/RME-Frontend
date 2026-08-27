export interface ReceivingItem {
  id: number
  receiving_record_id: number | null
  item_id: number | null
  quantity: number | null
  unit_price?: number | null
  created_at?: string
  updated_at?: string
}

export interface ReceivingItemFormValues {
  receiving_record_id?: number | null
  item_id?: number | null
  quantity?: number | null
  unit_price?: number | null
}
