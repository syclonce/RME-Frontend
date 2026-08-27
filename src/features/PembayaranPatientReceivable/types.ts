export interface PatientReceivable {
  id: number
  invoice_id: number | null
  patient_id: number | null
  amount: number | null
  due_date: string | null
  created_at?: string
  updated_at?: string
}

export interface PatientReceivableFormValues {
  invoice_id?: number | null
  patient_id?: number | null
  amount?: number | null
  due_date?: string | null
}
