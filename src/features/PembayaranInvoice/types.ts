export interface Invoice {
  id: number
  invoice_number: string | null
  visit_id: number
  invoice_date: string | null
  subtotal: number
  rounding_adjustment: number
  total_amount: number
  is_locked: boolean
  status: string
  created_at?: string
  updated_at?: string
}

export interface InvoiceFormValues {
  visit_id?: number
  invoice_date?: string
  rounding_adjustment?: number
}
