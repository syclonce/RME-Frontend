export interface GeneralPharmacyRoom {
  id: number
  ward_id: number | null
  pharmacy_type: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface GeneralPharmacyRoomFormValues {
  ward_id?: number | null
  pharmacy_type?: string | null
  is_active?: boolean | null
}
