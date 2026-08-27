export interface NutritionDietPattern {
  id: number
  visit_id: number | null
  assessed_by: number | null
  created_by?: number | null
  diet_type: string | null
  appetite?: string | null
  meal_frequency_per_day?: number | null
  food_allergies?: string | null
  special_diet_notes?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface NutritionDietPatternFormValues {
  visit_id?: number | null
  assessed_by?: number | null
  created_by?: number | null
  diet_type?: string | null
  appetite?: string | null
  meal_frequency_per_day?: number | null
  food_allergies?: string | null
  special_diet_notes?: string | null
  assessed_at?: string | null
}
