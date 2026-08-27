export interface RadiologyClaimItem {
  id: number
  radiology_claim_id: number | null
  exam_name: string | null
  amount: number | null
  created_at?: string
  updated_at?: string
}

export interface RadiologyClaimItemFormValues {
  radiology_claim_id?: number | null
  exam_name?: string | null
  amount?: number | null
}
