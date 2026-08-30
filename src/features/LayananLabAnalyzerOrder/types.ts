export interface LabAnalyzerVendor {
  id: number
  vendor_name: string | null
  connection_notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface LabAnalyzerVendorFormValues {
  vendor_name?: string | null
  connection_notes?: string | null
}

export interface LabAnalyzerOrder {
  id: number
  visit_id: number | null
  vendor_id?: number | null
  test_code: string | null
  ordered_by: number | null
  ordered_at?: string | null
  status?: string | null
  raw_result_text?: string | null
  verified_by?: number | null
  verified_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface LabAnalyzerOrderFormValues {
  visit_id?: number | null
  vendor_id?: number | null
  test_code?: string | null
  ordered_by?: number | null
  ordered_at?: string | null
}
