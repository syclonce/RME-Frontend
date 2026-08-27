export interface ProcedureConsentInformationReceiver {
  id: number
  consent_id: number | null
  receiver_name: string | null
  receiver_relationship?: string | null
  signed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ProcedureConsentInformationReceiverFormValues {
  consent_id?: number | null
  receiver_name?: string | null
  receiver_relationship?: string | null
  signed_at?: string | null
}
