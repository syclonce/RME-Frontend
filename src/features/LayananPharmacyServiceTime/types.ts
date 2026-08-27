export interface PharmacyServiceTime {
  id: number
  prescription_id: number | null
  received_at?: string | null
  prepared_at?: string | null
  dispensed_at?: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyServiceTimeFormValues {
  prescription_id?: number | null
  received_at?: string | null
  prepared_at?: string | null
  dispensed_at?: string | null
  status?: string | null
}
