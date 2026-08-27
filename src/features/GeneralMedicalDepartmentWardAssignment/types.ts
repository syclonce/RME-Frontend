export interface MedicalDepartmentWardAssignment {
  id: number
  medical_department_id: number | null
  ward_id: number | null
  is_primary?: boolean | null
  assigned_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface MedicalDepartmentWardAssignmentFormValues {
  medical_department_id?: number | null
  ward_id?: number | null
  is_primary?: boolean | null
  assigned_at?: string | null
}
