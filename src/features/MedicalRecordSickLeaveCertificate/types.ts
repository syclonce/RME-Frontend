export interface SickLeaveCertificate {
  id: number
  letter_number: string | null
  patient_id: number | null
  visit_id: number | null
  doctor_id: number | null
  issue_date: string | null
  start_date: string | null
  end_date: string | null
  duration_days: number | null
  diagnosis?: string | null
  remarks?: string | null
  created_at?: string
  updated_at?: string
}

export interface SickLeaveCertificateFormValues {
  letter_number?: string | null
  patient_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  issue_date?: string | null
  start_date?: string | null
  end_date?: string | null
  duration_days?: number | null
  diagnosis?: string | null
  remarks?: string | null
}
