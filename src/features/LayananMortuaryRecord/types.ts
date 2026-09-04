export interface MortuaryRecord {
  id: number
  visit_id?: number | null
  patient_id: number | null
  admitted_at: string | null
  cause_of_death_notes?: string | null
  created_at?: string
  updated_at?: string
  released_at?: string | null
  released_to_name?: string | null
  released_to_relationship?: string | null
  released_by?: number | null
  status?: string | null
}

export interface MortuaryRecordFormValues {
  visit_id?: number | null
  patient_id?: number | null
  admitted_at?: string | null
  cause_of_death_notes?: string | null
}
