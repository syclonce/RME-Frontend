export interface InterventionProtocolDetail {
  id: number
  protocol_id: number | null
  performed_by: number | null
  step_number: number | null
  step_description: string | null
  result_notes?: string | null
  performed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface InterventionProtocolDetailFormValues {
  protocol_id?: number | null
  performed_by?: number | null
  step_number?: number | null
  step_description?: string | null
  result_notes?: string | null
  performed_at?: string | null
}
