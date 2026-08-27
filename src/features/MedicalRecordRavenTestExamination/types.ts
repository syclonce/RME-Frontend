export interface RavenTestExamination {
  id: number
  visit_id: number | null
  test_form?: string | null
  raw_score?: number | null
  percentile?: number | null
  iq_grade?: string | null
  examiner_notes?: string | null
  tested_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface RavenTestExaminationFormValues {
  visit_id?: number | null
  test_form?: string | null
  raw_score?: number | null
  percentile?: number | null
  iq_grade?: string | null
  examiner_notes?: string | null
  tested_at?: string | null
}
