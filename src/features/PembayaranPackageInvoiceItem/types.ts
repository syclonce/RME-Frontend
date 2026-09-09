export interface PackageInvoiceItem {
  id: number
  invoice_id: number | null
  package_id: number | null
  quantity?: number | null
  unit_price: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  subtotal?: number | null
}

export interface PackageInvoiceItemFormValues {
  invoice_id?: number | null
  package_id?: number | null
  quantity?: number | null
  unit_price?: number | null
  notes?: string | null
}
