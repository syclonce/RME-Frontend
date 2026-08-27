export interface NursingCarePlanImplementation {
  id: number
  nursing_care_plan_id: number | null
  action_taken?: string | null
  performed_by: number | null
  performed_at: string | null
  evaluation?: string | null
  created_at?: string
  updated_at?: string
}

export interface NursingCarePlanImplementationFormValues {
  nursing_care_plan_id?: number | null
  action_taken?: string | null
  performed_by?: number | null
  performed_at?: string | null
  evaluation?: string | null
}
