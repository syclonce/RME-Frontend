export interface AnamnesisSource {
  id: number
  anamnesis_id: number | null
  source_type: string | null
  source_name?: string | null
  relationship?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface AnamnesisSourceFormValues {
  anamnesis_id?: number | null
  source_type?: string | null
  source_name?: string | null
  relationship?: string | null
  notes?: string | null
}
