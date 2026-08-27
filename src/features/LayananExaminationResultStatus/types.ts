export interface ExaminationResultStatus {
  id: number
  visit_id: number | null
  examination_type: string | null
  status?: string | null
  verified_by?: number | null
  verified_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface ExaminationResultStatusFormValues {
  visit_id?: number | null
  examination_type?: string | null
  status?: string | null
  verified_by?: number | null
  verified_at?: string | null
  notes?: string | null
}
