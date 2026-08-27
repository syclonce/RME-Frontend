export interface EmergencyEducation {
  id: number
  visit_id: number | null
  topic: string | null
  method?: string | null
  understanding_level?: string | null
  educator_id: number | null
  educated_at: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface EmergencyEducationFormValues {
  visit_id?: number | null
  topic?: string | null
  method?: string | null
  understanding_level?: string | null
  educator_id?: number | null
  educated_at?: string | null
  notes?: string | null
}
