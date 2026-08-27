export interface PathologyClaimItem {
  id: number
  pathology_claim_id: number | null
  exam_name: string | null
  amount: number | null
  created_at?: string
  updated_at?: string
}

export interface PathologyClaimItemFormValues {
  pathology_claim_id?: number | null
  exam_name?: string | null
  amount?: number | null
}
