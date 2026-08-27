export interface PharmacyServiceRoom {
  id: number
  ward_id: number | null
  service_type: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyServiceRoomFormValues {
  ward_id?: number | null
  service_type?: string | null
  is_active?: boolean | null
}
