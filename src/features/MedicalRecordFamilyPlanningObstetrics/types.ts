export interface FamilyPlanningObstetrics {
  id: number
  visit_id: number | null
  patient_id: number | null
  contraceptive_method: string | null
  installation_date?: string | null
  removal_date?: string | null
  side_effects?: string | null
  action_taken?: string | null
  next_visit_date?: string | null
  created_at?: string
  updated_at?: string
}

export interface FamilyPlanningObstetricsFormValues {
  visit_id?: number | null
  patient_id?: number | null
  contraceptive_method?: string | null
  installation_date?: string | null
  removal_date?: string | null
  side_effects?: string | null
  action_taken?: string | null
  next_visit_date?: string | null
}
