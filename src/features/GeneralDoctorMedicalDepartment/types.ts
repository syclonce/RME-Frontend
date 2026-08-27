export interface DoctorMedicalDepartment {
  id: number
  doctor_id: number | null
  medical_department_id: number | null
  is_head?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface DoctorMedicalDepartmentFormValues {
  doctor_id?: number | null
  medical_department_id?: number | null
  is_head?: boolean | null
}
