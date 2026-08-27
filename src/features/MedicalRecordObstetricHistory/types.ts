export interface ObstetricHistory {
  id: number
  visit_id: number | null
  created_by?: number | null
  pregnancy_number?: number | null
  delivery_date?: string | null
  delivery_method?: string | null
  birth_weight_grams?: number | null
  complications?: string | null
  outcome?: string | null
  created_at?: string
  updated_at?: string
}

export interface ObstetricHistoryFormValues {
  visit_id?: number | null
  created_by?: number | null
  pregnancy_number?: number | null
  delivery_date?: string | null
  delivery_method?: string | null
  birth_weight_grams?: number | null
  complications?: string | null
  outcome?: string | null
}
