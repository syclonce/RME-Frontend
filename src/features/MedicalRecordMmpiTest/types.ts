export interface MmpiTest {
  id: number
  patient_id: number | null
  visit_id: number | null
  doctor_id?: number | null
  test_date: string | null
  validity_scale_l?: number | null
  validity_scale_f?: number | null
  validity_scale_k?: number | null
  clinical_scales_summary?: string | null
  interpretation?: string | null
  conclusion?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface MmpiTestFormValues {
  patient_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  test_date?: string | null
  validity_scale_l?: number | null
  validity_scale_f?: number | null
  validity_scale_k?: number | null
  clinical_scales_summary?: string | null
  interpretation?: string | null
  conclusion?: string | null
}
