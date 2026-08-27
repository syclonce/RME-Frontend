export interface LabMicroscopicResult {
  id: number
  lab_order_id: number | null
  specimen_type: string | null
  findings: string | null
  examined_by?: number | null
  examined_at: string | null
  created_at?: string
  updated_at?: string
}

export interface LabMicroscopicResultFormValues {
  lab_order_id?: number | null
  specimen_type?: string | null
  findings?: string | null
  examined_by?: number | null
  examined_at?: string | null
}
