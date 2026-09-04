export interface GeneralPatientPhoto {
  id: number
  patient_id: number | null
  file_path: string | null
  photo_url?: string | null
  taken_at: string | null
  created_at?: string
  updated_at?: string
}

export interface GeneralPatientPhotoFormValues {
  patient_id?: number | null
  file_path?: string | null
  taken_at?: string | null
}
