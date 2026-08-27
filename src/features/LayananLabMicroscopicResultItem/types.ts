export interface LabMicroscopicResultItem {
  id: number
  lab_microscopic_result_id: number | null
  parameter_name: string | null
  value: string | null
  created_at?: string
  updated_at?: string
}

export interface LabMicroscopicResultItemFormValues {
  lab_microscopic_result_id?: number | null
  parameter_name?: string | null
  value?: string | null
}
