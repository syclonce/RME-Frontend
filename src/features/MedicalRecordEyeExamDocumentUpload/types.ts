export interface EyeExamDocumentUpload {
  id: number
  patient_id: number | null
  visit_id: number | null
  doctor_id?: number | null
  exam_date: string | null
  file_path: string | null
  eye_side?: string | null
  findings?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface EyeExamDocumentUploadFormValues {
  patient_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  exam_date?: string | null
  file_path?: string | null
  eye_side?: string | null
  findings?: string | null
}
