export interface GenitalExamination {
  id: number
  visit_id: number | null
  external_genitalia?: string | null
  discharge_characteristics?: string | null
  lesions_or_masses?: string | null
  notes?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface GenitalExaminationFormValues {
  visit_id?: number | null
  external_genitalia?: string | null
  discharge_characteristics?: string | null
  lesions_or_masses?: string | null
  notes?: string | null
  examined_at?: string | null
}
