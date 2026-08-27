export interface RadiologyOrder {
  id: number
  visit_id: number | null
  patient_id: number | null
  ordering_doctor_id?: number | null
  ordered_at: string | null
  clinical_notes?: string | null
  status: string | null
  created_at?: string
  updated_at?: string
}

export interface RadiologyOrderFormValues {
  visit_id?: number | null
  patient_id?: number | null
  ordering_doctor_id?: number | null
  ordered_at?: string | null
  clinical_notes?: string | null
  status?: string | null
}
