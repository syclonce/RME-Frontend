export interface SocialCondition {
  id: number
  visit_id: number | null
  living_situation?: string | null
  occupation_status?: string | null
  financial_status?: string | null
  support_system?: string | null
  recorded_by: number | null
  recorded_at: string | null
  created_at?: string
  updated_at?: string
}

export interface SocialConditionFormValues {
  visit_id?: number | null
  living_situation?: string | null
  occupation_status?: string | null
  financial_status?: string | null
  support_system?: string | null
  recorded_by?: number | null
  recorded_at?: string | null
}
