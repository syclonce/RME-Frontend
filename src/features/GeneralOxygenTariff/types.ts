export interface OxygenTariff {
  id: number
  oxygen_id?: number | null
  room_class_id?: number | null
  price: number | null
  effective_date?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface OxygenTariffFormValues {
  oxygen_id?: number | null
  room_class_id?: number | null
  price?: number | null
  effective_date?: string | null
  is_active?: boolean | null
}
