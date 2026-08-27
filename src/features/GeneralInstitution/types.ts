export interface Institution {
  id: number
  ppk_id?: number | null
  email: string | null
  website: string | null
  created_at?: string
  updated_at?: string
}

export interface InstitutionFormValues {
  ppk_id?: number | null
  email?: string | null
  website?: string | null
}
