export interface PrescriptionOriginUnitRestriction {
  id: number
  ward_id: number | null
  item_id?: number | null
  is_allowed?: boolean | null
  note?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PrescriptionOriginUnitRestrictionFormValues {
  ward_id?: number | null
  item_id?: number | null
  is_allowed?: boolean | null
  note?: string | null
  is_active?: boolean | null
}
