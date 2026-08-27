export interface PositionTitle {
  id: number
  name: string | null
  code?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PositionTitleFormValues {
  name?: string | null
  code?: string | null
  is_active?: boolean | null
}
