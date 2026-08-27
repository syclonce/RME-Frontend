export interface ExaminationType {
  id: number
  name: string | null
  category?: string | null
  description?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ExaminationTypeFormValues {
  name?: string | null
  category?: string | null
  description?: string | null
  is_active?: boolean | null
}
