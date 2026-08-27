export interface ExaminationGroupMapping {
  id: number
  examination_group_id: number | null
  mapping_category: string | null
  external_code?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ExaminationGroupMappingFormValues {
  examination_group_id?: number | null
  mapping_category?: string | null
  external_code?: string | null
  is_active?: boolean | null
}
