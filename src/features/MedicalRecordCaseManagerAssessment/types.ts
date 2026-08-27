export interface CaseManagerAssessment {
  id: number
  visit_id: number | null
  case_manager_id?: number | null
  screening_criteria?: string | null
  risk_level?: string | null
  care_plan?: string | null
  follow_up_needed: boolean | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface CaseManagerAssessmentFormValues {
  visit_id?: number | null
  case_manager_id?: number | null
  screening_criteria?: string | null
  risk_level?: string | null
  care_plan?: string | null
  follow_up_needed?: boolean | null
  assessed_at?: string | null
}
