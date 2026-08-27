export interface LabAnalyzerVendor {
  id: number
  visit_id: number | null
  vendor_id?: number | null
  test_code: string | null
  ordered_by: number | null
  ordered_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface LabAnalyzerVendorFormValues {
  visit_id?: number | null
  vendor_id?: number | null
  test_code?: string | null
  ordered_by?: number | null
  ordered_at?: string | null
}
