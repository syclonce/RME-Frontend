export interface InhalantAllergenExamination {
  id: number
  visit_id: number | null
  patient_id: number | null
  allergen_name: string | null
  reaction_grade?: string | null
  wheal_diameter_mm?: number | null
  erythema_diameter_mm?: number | null
  interpretation?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface InhalantAllergenExaminationFormValues {
  visit_id?: number | null
  patient_id?: number | null
  allergen_name?: string | null
  reaction_grade?: string | null
  wheal_diameter_mm?: number | null
  erythema_diameter_mm?: number | null
  interpretation?: string | null
  examined_at?: string | null
}
