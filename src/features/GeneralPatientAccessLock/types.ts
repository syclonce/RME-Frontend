export interface PatientAccessLock {
  id: number
  patient_id: number | null
  locked_by?: number | null
  reason: string | null
  locked_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PatientAccessLockFormValues {
  patient_id?: number | null
  locked_by?: number | null
  reason?: string | null
  locked_at?: string | null
}
