export interface LabOrder {
  id: number
  order_number?: string | null
  visit_id: number | null
  ordered_by: number | null
  ordered_at?: string | null
  destination?: string | null
  is_emergency?: boolean | null
  reason?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface LabOrderFormValues {
  order_number?: string | null
  visit_id?: number | null
  ordered_by?: number | null
  ordered_at?: string | null
  destination?: string | null
  is_emergency?: boolean | null
  reason?: string | null
  notes?: string | null
}
