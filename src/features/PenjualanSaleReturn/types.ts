export interface SaleReturn {
  id: number
  sale_id: number | null
  returned_at?: string | null
  reason?: string | null
  items: string | null
  created_at?: string
  updated_at?: string
}

export interface SaleReturnFormValues {
  sale_id?: number | null
  returned_at?: string | null
  reason?: string | null
  items?: string | null
}
