export interface ProcedureConsentInformationGiver {
  id: number
  consent_id: number | null
  giver_id: number | null
  giver_role?: string | null
  signed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ProcedureConsentInformationGiverFormValues {
  consent_id?: number | null
  giver_id?: number | null
  giver_role?: string | null
  signed_at?: string | null
}
