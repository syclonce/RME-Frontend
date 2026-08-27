export interface NursingIndicatorImplementation {
  id: number
  nursing_indicator_id: number | null
  visit_id: number | null
  value_recorded: string | null
  recorded_by: number | null
  recorded_at: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface NursingIndicatorImplementationFormValues {
  nursing_indicator_id?: number | null
  visit_id?: number | null
  value_recorded?: string | null
  recorded_by?: number | null
  recorded_at?: string | null
  notes?: string | null
}
