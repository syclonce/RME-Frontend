export interface LabSensitivityResult {
  id: number
  lab_order_id: number | null
  organism: string | null
  antibiotic_name: string | null
  sensitivity_result: string | null
  examined_at: string | null
  created_at?: string
  updated_at?: string
}

export interface LabSensitivityResultFormValues {
  lab_order_id?: number | null
  organism?: string | null
  antibiotic_name?: string | null
  sensitivity_result?: string | null
  examined_at?: string | null
}
