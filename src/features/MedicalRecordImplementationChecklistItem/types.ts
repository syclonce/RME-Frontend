export interface ImplementationChecklistItem {
  id: number
  code?: string | null
  name: string | null
  category?: string | null
  description?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ImplementationChecklistItemFormValues {
  code?: string | null
  name?: string | null
  category?: string | null
  description?: string | null
  is_active?: boolean | null
}
