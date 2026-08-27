export interface PharmacyTariffByRoomClass {
  id: number
  item_id?: number | null
  room_class_id?: number | null
  price: number | null
  effective_date?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyTariffByRoomClassFormValues {
  item_id?: number | null
  room_class_id?: number | null
  price?: number | null
  effective_date?: string | null
  is_active?: boolean | null
}
