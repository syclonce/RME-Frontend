export interface PatientComplaint {
  id: number
  patient_id?: number | null
  visit_id?: number | null
  category: string | null
  description: string | null
  submitted_at: string | null
  created_at?: string
  updated_at?: string
}

export interface PatientComplaintFormValues {
  patient_id?: number | null
  visit_id?: number | null
  category?: string | null
  description?: string | null
  submitted_at?: string | null
}

export interface PatientSurvey {
  id: number
  visit_id: number
  satisfaction_score: number
  feedback_text?: string | null
  submitted_at: string
  created_at?: string
  updated_at?: string
}
