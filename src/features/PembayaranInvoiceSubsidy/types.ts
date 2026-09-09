export interface InvoiceSubsidy {
  id: number
  invoice_id: number | null
  subsidy_source: string | null
  subsidy_amount: number | null
  status?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  approved_by?: number | null
  approved_at?: string | null
}

export interface InvoiceSubsidyFormValues {
  invoice_id?: number | null
  subsidy_source?: string | null
  subsidy_amount?: number | null
  status?: string | null
  notes?: string | null
}
