export interface DiscountType {
  id: number
  name: string | null
  code?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface DiscountTypeFormValues {
  name?: string | null
  code?: string | null
  is_active?: boolean | null
}
