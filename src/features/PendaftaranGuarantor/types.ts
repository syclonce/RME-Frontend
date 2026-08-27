export interface Guarantor {
  id: number
  registration_id: number | null
  payer_type: string | null
  member_number?: string | null
  room_class_id?: number | null
  reference_letter_number?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface GuarantorFormValues {
  registration_id?: number | null
  payer_type?: string | null
  member_number?: string | null
  room_class_id?: number | null
  reference_letter_number?: string | null
  notes?: string | null
}
