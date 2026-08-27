export interface EegExamination {
  id: number
  visit_id: number | null
  patient_id: number | null
  background_rhythm?: string | null
  epileptiform_discharges?: boolean | null
  abnormality_type?: string | null
  clinical_correlation?: string | null
  conclusion?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface EegExaminationFormValues {
  visit_id?: number | null
  patient_id?: number | null
  background_rhythm?: string | null
  epileptiform_discharges?: boolean | null
  abnormality_type?: string | null
  clinical_correlation?: string | null
  conclusion?: string | null
  examined_at?: string | null
}
