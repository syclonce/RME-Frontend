export interface Invoice {
  id: number
  invoice_number?: string | null
  visit_id: number | null
  invoice_date?: string | null
  rounding_adjustment?: number | null
  created_at?: string
  updated_at?: string
}

export interface InvoiceFormValues {
  invoice_number?: string | null
  visit_id?: number | null
  invoice_date?: string | null
  rounding_adjustment?: number | null
}
