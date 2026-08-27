export interface InvoiceItem {
  id: number
  invoice_id: number | null
  service_id?: number | null
  description: string | null
  category?: string | null
  quantity: number | null
  created_at?: string
  updated_at?: string
}

export interface InvoiceItemFormValues {
  invoice_id?: number | null
  service_id?: number | null
  description?: string | null
  category?: string | null
  quantity?: number | null
}
