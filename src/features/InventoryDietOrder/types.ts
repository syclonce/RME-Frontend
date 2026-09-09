export interface DietOrder {
  id: number
  visit_id: number | null
  diet_type: string | null
  calorie_target?: number | null
  allergy_notes?: string | null
  meal_schedule: string | null
  ordered_by: number | null
  order_date: string | null
  created_at?: string
  updated_at?: string
  status?: string | null
}

export interface DietOrderFormValues {
  visit_id?: number | null
  diet_type?: string | null
  calorie_target?: number | null
  allergy_notes?: string | null
  meal_schedule?: string | null
  ordered_by?: number | null
  order_date?: string | null
}
