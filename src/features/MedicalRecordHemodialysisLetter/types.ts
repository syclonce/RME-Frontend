export interface HemodialysisLetter {
  id: number
  letter_number: string | null
  patient_id: number | null
  visit_id: number | null
  doctor_id: number | null
  issue_date: string | null
  diagnosis?: string | null
  hd_frequency_per_week?: number | null
  vascular_access?: string | null
  remarks?: string | null
  created_at?: string
  updated_at?: string
}

export interface HemodialysisLetterFormValues {
  letter_number?: string | null
  patient_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  issue_date?: string | null
  diagnosis?: string | null
  hd_frequency_per_week?: number | null
  vascular_access?: string | null
  remarks?: string | null
}
