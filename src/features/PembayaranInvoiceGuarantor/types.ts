export interface InvoiceGuarantor {
  id: number
  invoice_id: number | null
  guarantor_id: number | null
  covered_amount?: number | null
  coverage_percentage?: number | null
  verification_status?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface InvoiceGuarantorFormValues {
  invoice_id?: number | null
  guarantor_id?: number | null
  covered_amount?: number | null
  coverage_percentage?: number | null
  verification_status?: string | null
  notes?: string | null
}
