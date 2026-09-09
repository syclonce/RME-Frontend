export interface RemunerationEntry {
  id: number
  employee_id: number | null
  source_type: string | null
  source_id: number | null
  role: string | null
  gross_amount: number | null
  deduction_percentage?: number | null
  fixed_deduction?: number | null
  service_date: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  net_amount?: number | null
}

export interface RemunerationEntryFormValues {
  employee_id?: number | null
  source_type?: string | null
  source_id?: number | null
  role?: string | null
  gross_amount?: number | null
  deduction_percentage?: number | null
  fixed_deduction?: number | null
  service_date?: string | null
  notes?: string | null
}
