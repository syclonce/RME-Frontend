export interface ServiceTariff {
  id: number
  service_id: number | null
  room_class_id?: number | null
  price: number | null
  effective_date: string | null
  decree_number?: string | null
  decree_date?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface ServiceTariffFormValues {
  service_id?: number | null
  room_class_id?: number | null
  price?: number | null
  effective_date?: string | null
  decree_number?: string | null
  decree_date?: string | null
  is_active?: boolean | null
}
