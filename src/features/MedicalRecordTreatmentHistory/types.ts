export interface TreatmentHistory {
  id: number
  visit_id: number | null
  created_by?: number | null
  treatment_description: string | null
  facility_name?: string | null
  treatment_date?: string | null
  outcome?: string | null
  created_at?: string
  updated_at?: string
}

export interface TreatmentHistoryFormValues {
  visit_id?: number | null
  created_by?: number | null
  treatment_description?: string | null
  facility_name?: string | null
  treatment_date?: string | null
  outcome?: string | null
}
