export interface PharmacyDepot {
  id: number
  code: string | null
  name: string | null
  ward_id?: number | null
  phone?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyDepotFormValues {
  code?: string | null
  name?: string | null
  ward_id?: number | null
  phone?: string | null
  is_active?: boolean | null
}
