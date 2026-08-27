export interface StaffWardAssignment {
  id: number
  staff_member_id: number | null
  ward_id: number | null
  assigned_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface StaffWardAssignmentFormValues {
  staff_member_id?: number | null
  ward_id?: number | null
  assigned_at?: string | null
}
