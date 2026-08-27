export interface SurgeryPerformer {
  id: number
  surgery_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  role?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface SurgeryPerformerFormValues {
  surgery_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  role?: string | null
  notes?: string | null
}
