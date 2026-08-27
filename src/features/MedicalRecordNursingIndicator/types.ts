export interface NursingIndicator {
  id: number
  code?: string | null
  name: string | null
  nursing_indicator_type_id?: number | null
  unit?: string | null
  target_value?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface NursingIndicatorFormValues {
  code?: string | null
  name?: string | null
  nursing_indicator_type_id?: number | null
  unit?: string | null
  target_value?: string | null
  is_active?: boolean | null
}
