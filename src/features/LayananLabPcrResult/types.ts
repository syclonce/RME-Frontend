export interface LabPcrResult {
  id: number
  lab_order_id: number | null
  target_gene: string | null
  result: string | null
  ct_value?: number | null
  examined_at: string | null
  created_at?: string
  updated_at?: string
}

export interface LabPcrResultFormValues {
  lab_order_id?: number | null
  target_gene?: string | null
  result?: string | null
  ct_value?: number | null
  examined_at?: string | null
}
