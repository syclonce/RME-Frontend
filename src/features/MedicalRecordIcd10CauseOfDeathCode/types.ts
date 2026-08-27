export interface Icd10CauseOfDeathCode {
  id: number
  code: string | null
  description: string | null
  category?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface Icd10CauseOfDeathCodeFormValues {
  code?: string | null
  description?: string | null
  category?: string | null
  is_active?: boolean | null
}
