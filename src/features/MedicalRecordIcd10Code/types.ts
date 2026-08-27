export interface Icd10Code {
  id: number
  code: string | null
  description: string | null
  category?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface Icd10CodeFormValues {
  code?: string | null
  description?: string | null
  category?: string | null
  is_active?: boolean | null
}
