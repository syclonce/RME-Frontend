export interface FoodAllergenExamination {
  id: number
  visit_id: number | null
  patient_id: number | null
  food_item: string | null
  reaction_grade?: string | null
  wheal_diameter_mm?: number | null
  symptoms_observed?: string | null
  interpretation?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface FoodAllergenExaminationFormValues {
  visit_id?: number | null
  patient_id?: number | null
  food_item?: string | null
  reaction_grade?: string | null
  wheal_diameter_mm?: number | null
  symptoms_observed?: string | null
  interpretation?: string | null
  examined_at?: string | null
}
