export interface PatientEscort {
  id: number
  registration_id: number | null
  full_name: string | null
  relationship_to_patient: string | null
  phone_number?: string | null
  address?: string | null
  arrival_mode?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
  status?: string | null
}

export interface PatientEscortFormValues {
  registration_id?: number | null
  full_name?: string | null
  relationship_to_patient?: string | null
  phone_number?: string | null
  address?: string | null
  arrival_mode?: string | null
  notes?: string | null
}
