export interface GeneralWardClassAssignment {
  id: number
  ward_id: number | null
  room_class_id: number | null
  created_at?: string
  updated_at?: string
}

export interface GeneralWardClassAssignmentFormValues {
  ward_id?: number | null
  room_class_id?: number | null
}
