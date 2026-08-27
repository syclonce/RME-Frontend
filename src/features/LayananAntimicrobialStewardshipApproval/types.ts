export interface AntimicrobialStewardshipApproval {
  id: number
  antimicrobial_stewardship_form_id: number | null
  approved_by?: number | null
  decision: string | null
  decision_note?: string | null
  decided_at: string | null
  created_at?: string
  updated_at?: string
}

export interface AntimicrobialStewardshipApprovalFormValues {
  antimicrobial_stewardship_form_id?: number | null
  approved_by?: number | null
  decision?: string | null
  decision_note?: string | null
  decided_at?: string | null
}
