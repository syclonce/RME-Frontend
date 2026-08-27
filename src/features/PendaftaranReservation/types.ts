export interface Reservation {
  id: number
  patient_id: number | null
  ward_id: number | null
  reserved_at: string | null
  scheduled_at: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface ReservationFormValues {
  patient_id?: number | null
  ward_id?: number | null
  reserved_at?: string | null
  scheduled_at?: string | null
  status?: string | null
}
