export interface MedicationAdministrationHistory {
  id: number
  visit_id: number | null
  administered_by: number | null
  created_by?: number | null
  drug_name: string | null
  dose?: string | null
  route?: string | null
  administered_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface MedicationAdministrationHistoryFormValues {
  visit_id?: number | null
  administered_by?: number | null
  created_by?: number | null
  drug_name?: string | null
  dose?: string | null
  route?: string | null
  administered_at?: string | null
  notes?: string | null
}
