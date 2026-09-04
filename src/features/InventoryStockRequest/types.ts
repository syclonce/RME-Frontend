export interface StockRequest {
  id: number
  ward_id: number | null
  item_id: number | null
  quantity: number | null
  requested_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  request_number?: string | null
  requested_by?: number | null
  fulfilled_at?: string | null
  status?: string | null
}

export interface StockRequestFormValues {
  ward_id?: number | null
  item_id?: number | null
  quantity?: number | null
  requested_at?: string | null
  notes?: string | null
}
