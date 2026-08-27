export interface ConsultationAnswer {
  id: number
  consultation_id: number | null
  answered_by: number | null
  answered_at?: string | null
  answer?: string | null
  created_at?: string
  updated_at?: string
}

export interface ConsultationAnswerFormValues {
  consultation_id?: number | null
  answered_by?: number | null
  answered_at?: string | null
  answer?: string | null
}
