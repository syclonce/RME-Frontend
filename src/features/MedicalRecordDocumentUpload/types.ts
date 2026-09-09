export interface DocumentUpload {
  id: number
  patient_id: number | null
  visit_id?: number | null
  document_name: string | null
  document_type?: string | null
  file_path: string | null
  file_size_bytes?: number | null
  uploaded_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface DocumentUploadFormValues {
  patient_id?: number | null
  visit_id?: number | null
  document_name?: string | null
  document_type?: string | null
  file_path?: string | null
  file_size_bytes?: number | null
  uploaded_at?: string | null
  notes?: string | null
}
