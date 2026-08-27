export interface ClaimInvoice {
  id: number
  claim_number?: string | null
  invoice_id: number | null
  guarantor_id?: number | null
  claim_amount: number | null
  created_at?: string
  updated_at?: string
}

export interface ClaimInvoiceFormValues {
  claim_number?: string | null
  invoice_id?: number | null
  guarantor_id?: number | null
  claim_amount?: number | null
}
