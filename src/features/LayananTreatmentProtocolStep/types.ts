export interface TreatmentProtocolStep {
  id: number
  treatment_protocol_id: number | null
  sequence: number | null
  instruction: string | null
  scheduled_at?: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface TreatmentProtocolStepFormValues {
  treatment_protocol_id?: number | null
  sequence?: number | null
  instruction?: string | null
  scheduled_at?: string | null
  status?: string | null
}
