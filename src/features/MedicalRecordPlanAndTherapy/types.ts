export interface PlanAndTherapy {
  id: number
  visit_id: number | null
  ordered_by: number | null
  created_by?: number | null
  assessment_summary?: string | null
  plan_description: string | null
  therapy_type?: string | null
  target_date?: string | null
  status?: string | null
  ordered_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PlanAndTherapyFormValues {
  visit_id?: number | null
  ordered_by?: number | null
  created_by?: number | null
  assessment_summary?: string | null
  plan_description?: string | null
  therapy_type?: string | null
  target_date?: string | null
  status?: string | null
  ordered_at?: string | null
}
