export interface FamilyMedicalHistory {
  id: number
  visit_id: number | null
  created_by?: number | null
  relation: string | null
  condition: string | null
  diagnosed_age?: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface FamilyMedicalHistoryFormValues {
  visit_id?: number | null
  created_by?: number | null
  relation?: string | null
  condition?: string | null
  diagnosed_age?: number | null
  notes?: string | null
}
