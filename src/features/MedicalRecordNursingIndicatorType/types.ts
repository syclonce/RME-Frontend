export interface NursingIndicatorType {
  id: number
  name: string | null
  description?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface NursingIndicatorTypeFormValues {
  name?: string | null
  description?: string | null
  is_active?: boolean | null
}
