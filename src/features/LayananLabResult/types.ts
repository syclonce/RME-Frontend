export interface LabResult {
  id: number
  lab_order_id: number | null
  test_name: string | null
  result_value: string | null
  normal_range?: string | null
  unit?: string | null
  is_abnormal?: boolean | null
  notes?: string | null
  recorded_at?: string | null
  created_at?: string
  updated_at?: string
  recorded_by?: number | null
  status?: string | null
}

export interface LabResultFormValues {
  lab_order_id?: number | null
  test_name?: string | null
  result_value?: string | null
  normal_range?: string | null
  unit?: string | null
  is_abnormal?: boolean | null
  notes?: string | null
  recorded_at?: string | null
}
