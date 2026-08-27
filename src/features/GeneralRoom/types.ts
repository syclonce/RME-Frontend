export interface Room {
  id: number
  ward_id: number | null
  room_number: string | null
  class_id?: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface RoomFormValues {
  ward_id?: number | null
  room_number?: string | null
  class_id?: number | null
  is_active?: boolean | null
}
