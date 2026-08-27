export interface Icd9CmCode {
  id: number
  code: string | null
  description: string | null
  category?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface Icd9CmCodeFormValues {
  code?: string | null
  description?: string | null
  category?: string | null
  is_active?: boolean | null
}
