export interface LabExaminationResult {
  id: number
  lab_order_id: number | null
  parameter_name: string | null
  result_value: string | null
  unit?: string | null
  reference_range?: string | null
  is_abnormal?: boolean | null
  examined_at: string | null
  created_at?: string
  updated_at?: string
}

export interface LabExaminationResultFormValues {
  lab_order_id?: number | null
  parameter_name?: string | null
  result_value?: string | null
  unit?: string | null
  reference_range?: string | null
  is_abnormal?: boolean | null
  examined_at?: string | null
}
