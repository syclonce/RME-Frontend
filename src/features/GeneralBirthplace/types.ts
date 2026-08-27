export interface Birthplace {
  id: number
  name: string | null
  village_id?: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface BirthplaceFormValues {
  name?: string | null
  village_id?: number | null
  is_active?: boolean | null
}
