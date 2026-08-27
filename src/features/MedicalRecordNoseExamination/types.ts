export interface NoseExamination {
  id: number
  visit_id: number | null
  deformity?: string | null
  septum_deviation?: boolean | null
  turbinate_hypertrophy?: boolean | null
  nasal_discharge?: string | null
  polyp_present?: boolean | null
  notes?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface NoseExaminationFormValues {
  visit_id?: number | null
  deformity?: string | null
  septum_deviation?: boolean | null
  turbinate_hypertrophy?: boolean | null
  nasal_discharge?: string | null
  polyp_present?: boolean | null
  notes?: string | null
  examined_at?: string | null
}
