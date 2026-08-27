export interface PatientDeathRecord {
  id: number
  visit_id: number | null
  patient_id: number | null
  died_at: string | null
  cause_of_death?: string | null
  declared_by?: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface PatientDeathRecordFormValues {
  visit_id?: number | null
  patient_id?: number | null
  died_at?: string | null
  cause_of_death?: string | null
  declared_by?: number | null
  notes?: string | null
}
