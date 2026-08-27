export interface PrescriptionFulfillment {
  id: number
  prescription_id: number | null
  served_by: number | null
  served_at: string | null
  status?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface PrescriptionFulfillmentFormValues {
  prescription_id?: number | null
  served_by?: number | null
  served_at?: string | null
  status?: string | null
  notes?: string | null
}
