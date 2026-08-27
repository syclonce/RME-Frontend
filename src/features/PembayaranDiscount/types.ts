export interface Discount {
  id: number
  code: string | null
  name: string | null
  discount_type: string | null
  value: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface DiscountFormValues {
  code?: string | null
  name?: string | null
  discount_type?: string | null
  value?: number | null
  is_active?: boolean | null
}
