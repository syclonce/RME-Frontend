export interface GeneralConsultationRoom {
  id: number
  ward_id: number | null
  consultation_type: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface GeneralConsultationRoomFormValues {
  ward_id?: number | null
  consultation_type?: string | null
  is_active?: boolean | null
}
