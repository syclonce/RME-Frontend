export interface SurgicalSafetyEvaluationResult {
  id: number
  visit_id: number | null
  operating_room_id?: number | null
  evaluator_id?: number | null
  checklist_score: number | null
  compliant?: boolean | null
  evaluated_at: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface SurgicalSafetyEvaluationResultFormValues {
  visit_id?: number | null
  operating_room_id?: number | null
  evaluator_id?: number | null
  checklist_score?: number | null
  compliant?: boolean | null
  evaluated_at?: string | null
  notes?: string | null
}
