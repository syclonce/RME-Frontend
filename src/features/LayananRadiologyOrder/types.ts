export interface RadiologyOrder {
  id: number
  visit_id: number | null
  patient_id: number | null
  ordering_doctor_id?: number | null
  /** Diserap dari ImagingOrder; backend membatasinya ke RadiologyOrder::MODALITIES. */
  modality?: string | null
  body_part?: string | null
  ordered_at: string | null
  clinical_notes?: string | null
  status: string | null
  created_at?: string
  updated_at?: string
  scheduled_at?: string | null
}

export interface RadiologyOrderFormValues {
  visit_id?: number | null
  patient_id?: number | null
  ordering_doctor_id?: number | null
  modality?: string | null
  body_part?: string | null
  ordered_at?: string | null
  clinical_notes?: string | null
  status?: string | null
}
