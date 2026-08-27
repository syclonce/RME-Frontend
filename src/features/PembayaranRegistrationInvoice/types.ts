export interface RegistrationInvoice {
  id: number
  registration_id: number | null
  invoice_id: number | null
  invoice_category?: string | null
  amount: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface RegistrationInvoiceFormValues {
  registration_id?: number | null
  invoice_id?: number | null
  invoice_category?: string | null
  amount?: number | null
  notes?: string | null
}
