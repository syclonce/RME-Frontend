export interface DiagnosisCode {
  id: number
  code: string | null
  name: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface DiagnosisCodeFormValues {
  code?: string | null
  name?: string | null
  is_active?: boolean | null
}
