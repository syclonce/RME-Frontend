export interface Kip {
  id: number
  patient_norm: string | null
  card_type: string | null
  card_number: string | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  region_code?: string | null
  created_at?: string
  updated_at?: string
}

export interface KipFormValues {
  patient_norm?: string | null
  card_type?: string | null
  card_number?: string | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  region_code?: string | null
}
