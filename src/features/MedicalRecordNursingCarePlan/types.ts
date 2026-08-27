export interface NursingCarePlan {
  id: number
  visit_id: number | null
  assessment?: string | null
  goal?: string | null
  intervention_plan?: string | null
  target_date?: string | null
  recorded_by: number | null
  recorded_at: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface NursingCarePlanFormValues {
  visit_id?: number | null
  assessment?: string | null
  goal?: string | null
  intervention_plan?: string | null
  target_date?: string | null
  recorded_by?: number | null
  recorded_at?: string | null
  status?: string | null
}
