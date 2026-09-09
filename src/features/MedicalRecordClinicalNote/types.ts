export interface ClinicalNote {
  id: number
  visit_id: number | null
  recorded_at?: string | null
  subjective?: string | null
  objective?: string | null
  assessment?: string | null
  planning?: string | null
  instructions?: string | null
  note_type?: string | null
  author_id: number | null
  sub_division?: string | null
  has_discharge_plan?: boolean | null
  discharge_plan_date?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
  status?: string | null
}

export interface ClinicalNoteFormValues {
  visit_id?: number | null
  recorded_at?: string | null
  subjective?: string | null
  objective?: string | null
  assessment?: string | null
  planning?: string | null
  instructions?: string | null
  note_type?: string | null
  author_id?: number | null
  sub_division?: string | null
  has_discharge_plan?: boolean | null
  discharge_plan_date?: string | null
}
