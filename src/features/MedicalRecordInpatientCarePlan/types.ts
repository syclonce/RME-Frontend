export interface InpatientCarePlan {
  id: number
  visit_id: number | null
  planned_by: number | null
  created_by?: number | null
  care_goals: string | null
  planned_length_of_stay_days?: number | null
  discharge_criteria?: string | null
  status?: string | null
  planned_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface InpatientCarePlanFormValues {
  visit_id?: number | null
  planned_by?: number | null
  created_by?: number | null
  care_goals?: string | null
  planned_length_of_stay_days?: number | null
  discharge_criteria?: string | null
  status?: string | null
  planned_at?: string | null
}
