export interface BreastExamination {
  id: number
  visit_id: number | null
  side?: string | null
  inspection?: string | null
  palpation?: string | null
  lump_present: boolean | null
  nipple_discharge?: string | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface BreastExaminationFormValues {
  visit_id?: number | null
  side?: string | null
  inspection?: string | null
  palpation?: string | null
  lump_present?: boolean | null
  nipple_discharge?: string | null
  findings?: string | null
  examined_at?: string | null
}
