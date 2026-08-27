export interface Sale {
  id: number
  patient_id?: number | null
  sold_by: number | null
  sold_at?: string | null
  total_amount: number | null
  created_at?: string
  updated_at?: string
}

export interface SaleFormValues {
  patient_id?: number | null
  sold_by?: number | null
  sold_at?: string | null
  total_amount?: number | null
}
