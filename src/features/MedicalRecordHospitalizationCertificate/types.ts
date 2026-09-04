export interface HospitalizationCertificate {
  id: number
  letter_number: string | null
  patient_id: number | null
  visit_id: number | null
  doctor_id: number | null
  issue_date: string | null
  admission_date?: string | null
  estimated_duration_days?: number | null
  ward_name?: string | null
  diagnosis?: string | null
  remarks?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface HospitalizationCertificateFormValues {
  letter_number?: string | null
  patient_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  issue_date?: string | null
  admission_date?: string | null
  estimated_duration_days?: number | null
  ward_name?: string | null
  diagnosis?: string | null
  remarks?: string | null
}
