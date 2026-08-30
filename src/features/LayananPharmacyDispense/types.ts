export interface PharmacyDispense {
  id: number
  prescription_id: number | null
  dispensed_by?: number | null
  dispensed_at?: string | null
  quantity?: number | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyDispenseFormValues {
  prescription_id?: number | null
}
