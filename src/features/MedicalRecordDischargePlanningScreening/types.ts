export interface DischargePlanningScreening {
  id: number
  visit_id: number | null
  screening_criteria?: string | null
  total_score?: number | null
  requires_planning?: boolean | null
  screened_by: number | null
  screened_at: string | null
  created_at?: string
  updated_at?: string
}

export interface DischargePlanningScreeningFormValues {
  visit_id?: number | null
  screening_criteria?: string | null
  total_score?: number | null
  requires_planning?: boolean | null
  screened_by?: number | null
  screened_at?: string | null
}
