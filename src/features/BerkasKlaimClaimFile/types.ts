export interface BerkasKlaimClaimFile {
  id: number
  visit_id: number | null
  invoice_id?: number | null
  status?: string | null
  created_at?: string
  updated_at?: string
  claim_number?: string | null
  submitted_at?: string | null
}

export interface BerkasKlaimClaimFileFormValues {
  visit_id?: number | null
  invoice_id?: number | null
  status?: string | null
}
