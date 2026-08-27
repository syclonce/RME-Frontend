export interface LabResultNote {
  id: number
  lab_result_id: number | null
  note: string | null
  created_by?: number | null
  created_at?: string
  updated_at?: string
}

export interface LabResultNoteFormValues {
  lab_result_id?: number | null
  note?: string | null
  created_by?: number | null
}
