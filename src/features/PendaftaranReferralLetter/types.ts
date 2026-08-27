export interface ReferralLetter {
  id: number
  visit_id: number | null
  from_department_id: number | null
  to_department_id: number | null
  issued_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface ReferralLetterFormValues {
  visit_id?: number | null
  from_department_id?: number | null
  to_department_id?: number | null
  issued_at?: string | null
  notes?: string | null
}
