export interface StockRequest {
  id: number
  ward_id: number | null
  item_id: number | null
  quantity: number | null
  requested_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface StockRequestFormValues {
  ward_id?: number | null
  item_id?: number | null
  quantity?: number | null
  requested_at?: string | null
  notes?: string | null
}
