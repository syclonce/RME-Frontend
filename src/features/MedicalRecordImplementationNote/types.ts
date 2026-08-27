export interface ImplementationNote {
  id: number
  visit_id: number | null
  note_type?: string | null
  content?: string | null
  recorded_by: number | null
  recorded_at: string | null
  created_at?: string
  updated_at?: string
}

export interface ImplementationNoteFormValues {
  visit_id?: number | null
  note_type?: string | null
  content?: string | null
  recorded_by?: number | null
  recorded_at?: string | null
}
