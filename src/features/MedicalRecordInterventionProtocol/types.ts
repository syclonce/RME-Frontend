export interface InterventionProtocol {
  id: number
  visit_id: number | null
  started_by: number | null
  created_by?: number | null
  protocol_name: string | null
  indication?: string | null
  status?: string | null
  started_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface InterventionProtocolFormValues {
  visit_id?: number | null
  started_by?: number | null
  created_by?: number | null
  protocol_name?: string | null
  indication?: string | null
  status?: string | null
  started_at?: string | null
}
