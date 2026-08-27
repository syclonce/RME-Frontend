export interface GuarantorSubspecialty {
  id: number
  guarantor_id: number | null
  subspecialty_name: string | null
  is_covered?: boolean | null
  coverage_note?: string | null
  created_at?: string
  updated_at?: string
}

export interface GuarantorSubspecialtyFormValues {
  guarantor_id?: number | null
  subspecialty_name?: string | null
  is_covered?: boolean | null
  coverage_note?: string | null
}
