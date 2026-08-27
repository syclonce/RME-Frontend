export interface BerkasKlaimClaimFile {
  id: number
  visit_id: number | null
  invoice_id?: number | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface BerkasKlaimClaimFileFormValues {
  visit_id?: number | null
  invoice_id?: number | null
  status?: string | null
}
