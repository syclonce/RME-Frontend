export interface AccidentRecord {
  id: number
  visit_id: number | null
  accident_type: string | null
  accident_at: string | null
  location: string | null
  police_report_number?: string | null
  created_at?: string
  updated_at?: string
}

export interface AccidentRecordFormValues {
  visit_id?: number | null
  accident_type?: string | null
  accident_at?: string | null
  location?: string | null
  police_report_number?: string | null
}
