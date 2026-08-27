export interface TreatmentProtocol {
  id: number
  visit_id: number | null
  protocol_name: string | null
  prescribed_by: number | null
  started_at: string | null
  ended_at?: string | null
  status?: string | null
  notes?: string | null
  created_by?: number | null
  created_at?: string
  updated_at?: string
}

export interface TreatmentProtocolFormValues {
  visit_id?: number | null
  protocol_name?: string | null
  prescribed_by?: number | null
  started_at?: string | null
  ended_at?: string | null
  status?: string | null
  notes?: string | null
  created_by?: number | null
}
