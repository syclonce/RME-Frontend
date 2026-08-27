export interface Item {
  id: number
  code?: string | null
  name: string | null
  category?: string | null
  unit: string | null
  brand?: string | null
  is_generic?: boolean | null
  is_formulary?: boolean | null
  buy_price?: number | null
  sell_price?: number | null
  stock_quantity?: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ItemFormValues {
  code?: string | null
  name?: string | null
  category?: string | null
  unit?: string | null
  brand?: string | null
  is_generic?: boolean | null
  is_formulary?: boolean | null
  buy_price?: number | null
  sell_price?: number | null
  stock_quantity?: number | null
  is_active?: boolean | null
}
