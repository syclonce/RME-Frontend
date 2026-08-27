export interface PharmacyClaimItem {
  id: number
  pharmacy_claim_id: number | null
  drug_name: string | null
  quantity: number | null
  unit_price: number | null
  amount: number | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyClaimItemFormValues {
  pharmacy_claim_id?: number | null
  drug_name?: string | null
  quantity?: number | null
  unit_price?: number | null
  amount?: number | null
}
