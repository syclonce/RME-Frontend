export interface InterventionIndicatorMapping {
  id: number
  intervention_code: string | null
  intervention_name: string | null
  indicator_code: string | null
  indicator_name: string | null
  evaluation_criteria?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface InterventionIndicatorMappingFormValues {
  intervention_code?: string | null
  intervention_name?: string | null
  indicator_code?: string | null
  indicator_name?: string | null
  evaluation_criteria?: string | null
  is_active?: boolean | null
}
