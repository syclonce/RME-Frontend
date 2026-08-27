export interface SitbDiagnosisType {
  id: number
  name: string | null
  code?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface SitbDiagnosisTypeFormValues {
  name?: string | null
  code?: string | null
  is_active?: boolean | null
}
