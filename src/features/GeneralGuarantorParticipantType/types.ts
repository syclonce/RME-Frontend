export interface GuarantorParticipantType {
  id: number
  name: string | null
  code?: string | null
  payer_type: string | null
  requires_verification?: boolean | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface GuarantorParticipantTypeFormValues {
  name?: string | null
  code?: string | null
  payer_type?: string | null
  requires_verification?: boolean | null
  is_active?: boolean | null
}
