export interface BerkasKlaimSupportingDocument {
  id: number
  claim_file_id: number | null
  document_type: string | null
  file_path: string | null
  uploaded_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface BerkasKlaimSupportingDocumentFormValues {
  claim_file_id?: number | null
  document_type?: string | null
  file_path?: string | null
  uploaded_at?: string | null
}
