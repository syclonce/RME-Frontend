export interface MedicationIteration {
  id: number
  prescription_id: number | null
  iteration_number: number | null
  quantity: number | null
  dispensed_at?: string | null
  status: string | null
  created_at?: string
  updated_at?: string
}

export interface MedicationIterationFormValues {
  prescription_id?: number | null
  iteration_number?: number | null
  quantity?: number | null
  dispensed_at?: string | null
  status?: string | null
}
