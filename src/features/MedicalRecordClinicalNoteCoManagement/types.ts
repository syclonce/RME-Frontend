export interface ClinicalNoteCoManagement {
  id: number
  clinical_note_id: number | null
  medical_department_id: number | null
  notes?: string | null
  author_id: number | null
  recorded_at: string | null
  created_at?: string
  updated_at?: string
}

export interface ClinicalNoteCoManagementFormValues {
  clinical_note_id?: number | null
  medical_department_id?: number | null
  notes?: string | null
  author_id?: number | null
  recorded_at?: string | null
}
