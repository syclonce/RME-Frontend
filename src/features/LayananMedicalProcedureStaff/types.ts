export interface MedicalProcedureStaff {
  id: number
  medical_procedure_id: number | null
  employee_id: number | null
  role: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface MedicalProcedureStaffFormValues {
  medical_procedure_id?: number | null
  employee_id?: number | null
  role?: string | null
  notes?: string | null
}
