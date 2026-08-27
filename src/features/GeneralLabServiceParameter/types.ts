export interface LabServiceParameter {
  id: number
  lab_service_group_id?: number | null
  name: string | null
  code?: string | null
  unit?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface LabServiceParameterFormValues {
  lab_service_group_id?: number | null
  name?: string | null
  code?: string | null
  unit?: string | null
  is_active?: boolean | null
}
