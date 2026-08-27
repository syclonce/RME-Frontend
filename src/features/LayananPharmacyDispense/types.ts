export interface PharmacyDispense {
  id: number
  prescription_id: number | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyDispenseFormValues {
  prescription_id?: number | null
}
