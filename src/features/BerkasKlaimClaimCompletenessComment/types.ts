export interface BerkasKlaimClaimCompletenessComment {
  id: number
  claim_completeness_id: number | null
  comment: string | null
  commented_by?: string | null
  commented_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface BerkasKlaimClaimCompletenessCommentFormValues {
  claim_completeness_id?: number | null
  comment?: string | null
  commented_by?: string | null
  commented_at?: string | null
}
