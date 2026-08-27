export interface Visit {
  id: number
  visit_number?: string | null
  registration_id: number | null
  attending_physician_id?: number | null
  ward_id?: number | null
  bed_id?: number | null
  admitted_at?: string | null
  is_new_visit?: boolean | null
  is_deposit?: boolean | null
  deposit_class_id?: number | null
  created_at?: string
  updated_at?: string
}

export interface VisitFormValues {
  visit_number?: string | null
  registration_id?: number | null
  attending_physician_id?: number | null
  ward_id?: number | null
  bed_id?: number | null
  admitted_at?: string | null
  is_new_visit?: boolean | null
  is_deposit?: boolean | null
  deposit_class_id?: number | null
}
