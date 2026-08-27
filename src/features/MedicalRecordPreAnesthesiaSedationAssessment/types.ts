export interface PreAnesthesiaSedationAssessment {
  id: number
  visit_id: number | null
  doctor_id: number | null
  created_by?: number | null
  asa_classification: string | null
  mallampati_class?: number | null
  npo_hours?: number | null
  comorbidities?: string | null
  planned_anesthesia_type?: string | null
  risk_notes?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PreAnesthesiaSedationAssessmentFormValues {
  visit_id?: number | null
  doctor_id?: number | null
  created_by?: number | null
  asa_classification?: string | null
  mallampati_class?: number | null
  npo_hours?: number | null
  comorbidities?: string | null
  planned_anesthesia_type?: string | null
  risk_notes?: string | null
  assessed_at?: string | null
}
