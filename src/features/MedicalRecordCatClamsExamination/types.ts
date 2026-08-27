export interface CatClamsExamination {
  id: number
  visit_id: number | null
  patient_id: number | null
  cat_score?: number | null
  clams_score?: number | null
  developmental_quotient?: number | null
  developmental_age_months?: number | null
  interpretation?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface CatClamsExaminationFormValues {
  visit_id?: number | null
  patient_id?: number | null
  cat_score?: number | null
  clams_score?: number | null
  developmental_quotient?: number | null
  developmental_age_months?: number | null
  interpretation?: string | null
  examined_at?: string | null
}
