export interface ProcedureConsentPatientAcknowledgement {
  id: number
  consent_id: number | null
  acknowledger_name: string | null
  relationship_to_patient?: string | null
  decision: string | null
  signed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ProcedureConsentPatientAcknowledgementFormValues {
  consent_id?: number | null
  acknowledger_name?: string | null
  relationship_to_patient?: string | null
  decision?: string | null
  signed_at?: string | null
}
