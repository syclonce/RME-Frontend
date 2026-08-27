export interface LabReferenceValue {
  id: number
  lab_service_parameter_id: number | null
  gender?: string | null
  min_age?: number | null
  max_age?: number | null
  min_value?: number | null
  max_value?: number | null
  unit?: string | null
  note?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface LabReferenceValueFormValues {
  lab_service_parameter_id?: number | null
  gender?: string | null
  min_age?: number | null
  max_age?: number | null
  min_value?: number | null
  max_value?: number | null
  unit?: string | null
  note?: string | null
  is_active?: boolean | null
}
