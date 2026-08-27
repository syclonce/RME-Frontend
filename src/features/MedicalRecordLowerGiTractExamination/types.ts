export interface LowerGiTractExamination {
  id: number
  visit_id: number | null
  procedure_type?: string | null
  colon_findings?: string | null
  rectum_findings?: string | null
  polyps_found: boolean | null
  biopsy_taken: boolean | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface LowerGiTractExaminationFormValues {
  visit_id?: number | null
  procedure_type?: string | null
  colon_findings?: string | null
  rectum_findings?: string | null
  polyps_found?: boolean | null
  biopsy_taken?: boolean | null
  examined_at?: string | null
}
