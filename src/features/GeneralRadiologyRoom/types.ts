export interface GeneralRadiologyRoom {
  id: number
  ward_id: number | null
  radiology_type: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface GeneralRadiologyRoomFormValues {
  ward_id?: number | null
  radiology_type?: string | null
  is_active?: boolean | null
}
