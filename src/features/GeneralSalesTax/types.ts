export interface SalesTax {
  id: number
  name: string | null
  rate: number | null
  effective_date?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface SalesTaxFormValues {
  name?: string | null
  rate?: number | null
  effective_date?: string | null
  is_active?: boolean | null
}
