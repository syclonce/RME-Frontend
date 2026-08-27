export interface StaffMember {
  id: number
  employee_id: number | null
  staff_role?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface StaffMemberFormValues {
  employee_id?: number | null
  staff_role?: string | null
  is_active?: boolean | null
}
