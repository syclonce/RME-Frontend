export interface MedicalCheckupResult {
  id: number
  patient_id: number | null
  visit_id?: number | null
  checkup_date: string | null
  category?: string | null
  summary?: string | null
  recommendation?: string | null
  examined_by: number | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface MedicalCheckupResultFormValues {
  patient_id?: number | null
  visit_id?: number | null
  checkup_date?: string | null
  category?: string | null
  summary?: string | null
  recommendation?: string | null
  examined_by?: number | null
  status?: string | null
}
