export interface EarExamination {
  id: number
  visit_id: number | null
  side?: string | null
  otoscopy?: string | null
  tympanic_membrane?: string | null
  hearing_test_result?: string | null
  discharge: boolean | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface EarExaminationFormValues {
  visit_id?: number | null
  side?: string | null
  otoscopy?: string | null
  tympanic_membrane?: string | null
  hearing_test_result?: string | null
  discharge?: boolean | null
  findings?: string | null
  examined_at?: string | null
}
