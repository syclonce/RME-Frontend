export interface GuarantorWardAccess {
  id: number
  guarantor_id: number | null
  ward_id: number | null
  is_allowed?: boolean | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface GuarantorWardAccessFormValues {
  guarantor_id?: number | null
  ward_id?: number | null
  is_allowed?: boolean | null
  notes?: string | null
}
