export interface GeneralOperatingRoom {
  id: number
  ward_id: number | null
  room_number: string | null
  equipment_notes?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface GeneralOperatingRoomFormValues {
  ward_id?: number | null
  room_number?: string | null
  equipment_notes?: string | null
  is_active?: boolean | null
}
