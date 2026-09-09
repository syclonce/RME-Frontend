export interface WardVisitType {
  id: number
  name: string | null
  code?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
  triggers_emergency_flag?: boolean | null
}

export interface WardVisitTypeFormValues {
  name?: string | null
  code?: string | null
  is_active?: boolean | null
}
