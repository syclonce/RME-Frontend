export interface GeneralLaboratoryRoom {
  id: number
  ward_id: number | null
  lab_type: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface GeneralLaboratoryRoomFormValues {
  ward_id?: number | null
  lab_type?: string | null
  is_active?: boolean | null
}
