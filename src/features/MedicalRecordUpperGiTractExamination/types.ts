export interface UpperGiTractExamination {
  id: number
  visit_id: number | null
  procedure_type?: string | null
  esophagus_findings?: string | null
  stomach_findings?: string | null
  duodenum_findings?: string | null
  hpylori_result?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface UpperGiTractExaminationFormValues {
  visit_id?: number | null
  procedure_type?: string | null
  esophagus_findings?: string | null
  stomach_findings?: string | null
  duodenum_findings?: string | null
  hpylori_result?: string | null
  examined_at?: string | null
}
