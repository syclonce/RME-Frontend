export interface AnatomyTemplate {
  id: number
  code?: string | null
  name: string | null
  description?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface AnatomyTemplateFormValues {
  code?: string | null
  name?: string | null
  description?: string | null
  is_active?: boolean | null
}
