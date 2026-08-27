export interface ReportTypeItem {
  id: number
  report_type_id: number | null
  name: string | null
  code?: string | null
  sequence?: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ReportTypeItemFormValues {
  report_type_id?: number | null
  name?: string | null
  code?: string | null
  sequence?: number | null
  is_active?: boolean | null
}
