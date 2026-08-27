export interface AntimicrobialStewardshipForm {
  id: number
  visit_id: number | null
  patient_id: number | null
  requesting_doctor_id?: number | null
  antibiotic_restriction_id?: number | null
  indication: string | null
  status: string | null
  submitted_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface AntimicrobialStewardshipFormFormValues {
  visit_id?: number | null
  patient_id?: number | null
  requesting_doctor_id?: number | null
  antibiotic_restriction_id?: number | null
  indication?: string | null
  status?: string | null
  submitted_at?: string | null
}
