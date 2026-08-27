export interface HealthCertificate {
  id: number
  letter_number: string | null
  patient_id: number | null
  visit_id: number | null
  doctor_id: number | null
  issue_date: string | null
  physical_fitness_status?: string | null
  purpose?: string | null
  blood_pressure?: string | null
  height_cm?: number | null
  weight_kg?: number | null
  remarks?: string | null
  created_at?: string
  updated_at?: string
}

export interface HealthCertificateFormValues {
  letter_number?: string | null
  patient_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  issue_date?: string | null
  physical_fitness_status?: string | null
  purpose?: string | null
  blood_pressure?: string | null
  height_cm?: number | null
  weight_kg?: number | null
  remarks?: string | null
}
