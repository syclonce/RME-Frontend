export interface DoctorProcedureConsent {
  id: number
  visit_id: number | null
  doctor_id: number | null
  created_by?: number | null
  procedure_name: string | null
  indication?: string | null
  consent_decision?: string | null
  signed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface DoctorProcedureConsentFormValues {
  visit_id?: number | null
  doctor_id?: number | null
  created_by?: number | null
  procedure_name?: string | null
  indication?: string | null
  consent_decision?: string | null
  signed_at?: string | null
}
