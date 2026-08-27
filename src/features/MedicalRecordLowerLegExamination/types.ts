export interface LowerLegExamination {
  id: number
  visit_id: number | null
  side?: string | null
  muscle_strength?: string | null
  edema: boolean | null
  pulses?: string | null
  skin_condition?: string | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface LowerLegExaminationFormValues {
  visit_id?: number | null
  side?: string | null
  muscle_strength?: string | null
  edema?: boolean | null
  pulses?: string | null
  skin_condition?: string | null
  findings?: string | null
  examined_at?: string | null
}
