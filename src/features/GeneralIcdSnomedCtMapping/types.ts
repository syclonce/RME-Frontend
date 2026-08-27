export interface IcdSnomedCtMapping {
  id: number
  icd_code: string | null
  snomed_code: string | null
  icd_description?: string | null
  snomed_description?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface IcdSnomedCtMappingFormValues {
  icd_code?: string | null
  snomed_code?: string | null
  icd_description?: string | null
  snomed_description?: string | null
  is_active?: boolean | null
}
