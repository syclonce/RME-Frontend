export interface EndOfLifePsychosocialRelationship {
  id: number
  visit_id: number | null
  relationship_type?: string | null
  support_system?: string | null
  spiritual_needs?: string | null
  emotional_state?: string | null
  assessed_by: number | null
  assessed_at: string | null
  created_at?: string
  updated_at?: string
}

export interface EndOfLifePsychosocialRelationshipFormValues {
  visit_id?: number | null
  relationship_type?: string | null
  support_system?: string | null
  spiritual_needs?: string | null
  emotional_state?: string | null
  assessed_by?: number | null
  assessed_at?: string | null
}
