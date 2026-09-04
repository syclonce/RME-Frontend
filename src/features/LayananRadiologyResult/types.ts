export interface RadiologyResult {
  id: number
  radiology_order_id: number | null
  findings: string | null
  impression?: string | null
  radiologist_id?: number | null
  examined_at: string | null
  status: string | null
  created_at?: string
  updated_at?: string
  study_instance_uid?: string | null
  report_url?: string | null
}

export interface RadiologyResultFormValues {
  radiology_order_id?: number | null
  findings?: string | null
  impression?: string | null
  radiologist_id?: number | null
  examined_at?: string | null
  status?: string | null
}
