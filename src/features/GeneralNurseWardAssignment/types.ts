export interface NurseWardAssignment {
  id: number
  nurse_id: number | null
  ward_id: number | null
  shift?: string | null
  assigned_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface NurseWardAssignmentFormValues {
  nurse_id?: number | null
  ward_id?: number | null
  shift?: string | null
  assigned_at?: string | null
}
