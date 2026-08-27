export interface Kap {
  id: number
  patient_norm: string | null
  card_type: string | null
  card_number: string | null
  created_at?: string
  updated_at?: string
}

export interface KapFormValues {
  patient_norm?: string | null
  card_type?: string | null
  card_number?: string | null
}
