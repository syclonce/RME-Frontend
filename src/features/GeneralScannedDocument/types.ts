export interface GeneralScannedDocument {
  id: number
  patient_id?: number | null
  document_type: string | null
  file_path: string | null
  scanned_at: string | null
  scanned_by: number | null
  created_at?: string
  updated_at?: string
}

export interface GeneralScannedDocumentFormValues {
  patient_id?: number | null
  document_type?: string | null
  file_path?: string | null
  scanned_at?: string | null
  scanned_by?: number | null
}
