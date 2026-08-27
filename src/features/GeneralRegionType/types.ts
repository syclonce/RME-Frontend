export interface RegionType {
  id: number
  name: string | null
  digit_count?: number | null
  delimiter?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface RegionTypeFormValues {
  name?: string | null
  digit_count?: number | null
  delimiter?: string | null
  is_active?: boolean | null
}
