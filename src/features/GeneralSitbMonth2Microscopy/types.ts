export interface SitbMonth2Microscopy {
  id: number
  name: string | null
  code?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface SitbMonth2MicroscopyFormValues {
  name?: string | null
  code?: string | null
  is_active?: boolean | null
}
