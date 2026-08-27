export interface ProcedureConsentInformation {
  id: number
  consent_id: number | null
  explained_by: number | null
  diagnosis_explanation?: string | null
  procedure_explanation?: string | null
  purpose?: string | null
  risks_and_complications?: string | null
  alternative_procedures?: string | null
  prognosis?: string | null
  explained_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ProcedureConsentInformationFormValues {
  consent_id?: number | null
  explained_by?: number | null
  diagnosis_explanation?: string | null
  procedure_explanation?: string | null
  purpose?: string | null
  risks_and_complications?: string | null
  alternative_procedures?: string | null
  prognosis?: string | null
  explained_at?: string | null
}
