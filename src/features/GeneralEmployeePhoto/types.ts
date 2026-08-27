export interface GeneralEmployeePhoto {
  id: number
  employee_id: number | null
  file_path: string | null
  taken_at: string | null
  created_at?: string
  updated_at?: string
}

export interface GeneralEmployeePhotoFormValues {
  employee_id?: number | null
  file_path?: string | null
  taken_at?: string | null
}
