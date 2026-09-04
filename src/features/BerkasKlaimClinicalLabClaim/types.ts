export interface ClinicalLabClaim {
  id: number
  claim_file_id: number | null
  order_id?: number | null
  submitted_at?: string | null
  created_at?: string
  updated_at?: string
  status?: string | null
}

export interface ClinicalLabClaimFormValues {
  claim_file_id?: number | null
  order_id?: number | null
  submitted_at?: string | null
}
