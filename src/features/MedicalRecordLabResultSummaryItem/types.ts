export interface LabResultSummaryItem {
  id: number
  summary_id: number | null
  lab_test_name: string | null
  result_value: string | null
  unit?: string | null
  reference_range?: string | null
  flag?: string | null
  tested_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface LabResultSummaryItemFormValues {
  summary_id?: number | null
  lab_test_name?: string | null
  result_value?: string | null
  unit?: string | null
  reference_range?: string | null
  flag?: string | null
  tested_at?: string | null
}
