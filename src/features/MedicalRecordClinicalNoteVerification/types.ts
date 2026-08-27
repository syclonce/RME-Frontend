export interface ClinicalNoteVerification {
  id: number
  clinical_note_id: number | null
  verifier_doctor_id: number | null
  verification_status?: string | null
  verified_at: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface ClinicalNoteVerificationFormValues {
  clinical_note_id?: number | null
  verifier_doctor_id?: number | null
  verification_status?: string | null
  verified_at?: string | null
  notes?: string | null
}
