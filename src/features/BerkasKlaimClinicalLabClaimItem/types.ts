export interface ClinicalLabClaimItem {
  id: number
  clinical_lab_claim_id: number | null
  test_name: string | null
  amount: number | null
  created_at?: string
  updated_at?: string
}

export interface ClinicalLabClaimItemFormValues {
  clinical_lab_claim_id?: number | null
  test_name?: string | null
  amount?: number | null
}
