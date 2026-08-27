export interface ReportType {
  id: number
  name: string | null
  class_name: string | null
  module: string | null
  level?: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ReportTypeFormValues {
  name?: string | null
  class_name?: string | null
  module?: string | null
  level?: number | null
  is_active?: boolean | null
}
