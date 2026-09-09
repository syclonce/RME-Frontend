export interface PharmacyClaim {
  id: number
  claim_file_id: number | null
  prescription_id?: number | null
  submitted_at?: string | null
  created_at?: string
  updated_at?: string
  status?: string | null
}

export interface PharmacyClaimFormValues {
  claim_file_id?: number | null
  prescription_id?: number | null
  submitted_at?: string | null
}
