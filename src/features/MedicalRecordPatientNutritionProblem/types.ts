export interface PatientNutritionProblem {
  id: number
  visit_id: number | null
  identified_by: number | null
  created_by?: number | null
  problem_category: string | null
  problem_description: string | null
  intervention_plan?: string | null
  status?: string | null
  identified_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PatientNutritionProblemFormValues {
  visit_id?: number | null
  identified_by?: number | null
  created_by?: number | null
  problem_category?: string | null
  problem_description?: string | null
  intervention_plan?: string | null
  status?: string | null
  identified_at?: string | null
}
