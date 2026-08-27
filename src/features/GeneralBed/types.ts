export interface Bed {
  id: number
  room_id: number | null
  bed_number: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface BedFormValues {
  room_id?: number | null
  bed_number?: string | null
  is_active?: boolean | null
}
