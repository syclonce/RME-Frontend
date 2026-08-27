export interface PharmacyReturn {
  id: number
  prescription_item_id: number | null
  quantity_returned: number | null
  reason: string | null
  returned_by: number | null
  returned_at: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyReturnFormValues {
  prescription_item_id?: number | null
  quantity_returned?: number | null
  reason?: string | null
  returned_by?: number | null
  returned_at?: string | null
  status?: string | null
}
