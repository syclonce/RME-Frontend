export interface TbDiseaseHistory {
  id: number
  visit_id: number | null
  created_by?: number | null
  previous_tb_treatment?: boolean | null
  treatment_year?: number | null
  treatment_outcome?: string | null
  tb_category?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface TbDiseaseHistoryFormValues {
  visit_id?: number | null
  created_by?: number | null
  previous_tb_treatment?: boolean | null
  treatment_year?: number | null
  treatment_outcome?: string | null
  tb_category?: string | null
  notes?: string | null
}
