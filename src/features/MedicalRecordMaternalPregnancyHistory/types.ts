export interface MaternalPregnancyHistory {
  id: number
  visit_id: number | null
  created_by?: number | null
  gravida?: number | null
  para?: number | null
  abortus?: number | null
  pregnancy_complications?: string | null
  delivery_method_history?: string | null
  created_at?: string
  updated_at?: string
}

export interface MaternalPregnancyHistoryFormValues {
  visit_id?: number | null
  created_by?: number | null
  gravida?: number | null
  para?: number | null
  abortus?: number | null
  pregnancy_complications?: string | null
  delivery_method_history?: string | null
}
