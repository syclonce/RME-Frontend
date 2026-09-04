export interface InvoiceItem {
  id: number
  invoice_id: number | null
  service_id?: number | null
  description: string | null
  category?: string | null
  quantity: number | null
  created_at?: string
  updated_at?: string
  ward_id?: number | null
  unit_price?: number | null
  subtotal?: number | null
}

export interface InvoiceItemFormValues {
  invoice_id?: number | null
  service_id?: number | null
  description?: string | null
  category?: string | null
  quantity?: number | null
}
