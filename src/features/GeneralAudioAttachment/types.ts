export interface AudioAttachment {
  id: number
  patient_id?: number | null
  visit_id?: number | null
  title: string | null
  file_path: string | null
  mime_type?: string | null
  duration_seconds?: number | null
  recorded_by?: number | null
  notes?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface AudioAttachmentFormValues {
  patient_id?: number | null
  visit_id?: number | null
  title?: string | null
  file_path?: string | null
  mime_type?: string | null
  duration_seconds?: number | null
  recorded_by?: number | null
  notes?: string | null
  is_active?: boolean | null
}
