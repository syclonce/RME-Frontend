export interface PatientFamilyEducation {
  id: number
  visit_id: number | null
  topic: string | null
  method?: string | null
  barrier?: string | null
  understanding_level?: string | null
  re_education_needed?: boolean | null
  educator_id: number | null
  educated_at: string | null
  created_at?: string
  updated_at?: string
}

export interface PatientFamilyEducationFormValues {
  visit_id?: number | null
  topic?: string | null
  method?: string | null
  barrier?: string | null
  understanding_level?: string | null
  re_education_needed?: boolean | null
  educator_id?: number | null
  educated_at?: string | null
}
