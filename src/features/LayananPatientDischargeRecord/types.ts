export interface PatientDischargeRecord {
  id: number
  visit_id: number | null
  patient_id: number | null
  discharged_at: string | null
  discharge_method: string | null
  discharged_by?: number | null
  follow_up_notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface PatientDischargeRecordFormValues {
  visit_id?: number | null
  patient_id?: number | null
  discharged_at?: string | null
  discharge_method?: string | null
  discharged_by?: number | null
  follow_up_notes?: string | null
}
