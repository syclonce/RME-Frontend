export interface ParentalHealthHistoryScreening {
  id: number
  visit_id: number | null
  screened_by: number | null
  created_by?: number | null
  father_health_conditions?: string | null
  mother_health_conditions?: string | null
  consanguinity?: boolean | null
  genetic_disorder_history?: string | null
  screened_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ParentalHealthHistoryScreeningFormValues {
  visit_id?: number | null
  screened_by?: number | null
  created_by?: number | null
  father_health_conditions?: string | null
  mother_health_conditions?: string | null
  consanguinity?: boolean | null
  genetic_disorder_history?: string | null
  screened_at?: string | null
}
