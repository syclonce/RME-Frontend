export interface NursingImplementation {
  id: number
  nursing_diagnosis_id: number | null
  action_taken?: string | null
  performed_by: number | null
  performed_at: string | null
  patient_response?: string | null
  created_at?: string
  updated_at?: string
}

export interface NursingImplementationFormValues {
  nursing_diagnosis_id?: number | null
  action_taken?: string | null
  performed_by?: number | null
  performed_at?: string | null
  patient_response?: string | null
}
