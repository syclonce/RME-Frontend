export interface EndOfLifeEducation {
  id: number
  visit_id: number | null
  topic: string | null
  participants?: string | null
  decision_summary?: string | null
  educator_id: number | null
  educated_at: string | null
  created_at?: string
  updated_at?: string
}

export interface EndOfLifeEducationFormValues {
  visit_id?: number | null
  topic?: string | null
  participants?: string | null
  decision_summary?: string | null
  educator_id?: number | null
  educated_at?: string | null
}
