export interface SitbPreCulture {
  id: number
  name: string | null
  code?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface SitbPreCultureFormValues {
  name?: string | null
  code?: string | null
  is_active?: boolean | null
}
