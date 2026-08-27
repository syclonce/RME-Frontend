export interface AntimicrobialStewardshipLabResult {
  id: number
  antimicrobial_stewardship_form_id: number | null
  lab_result_id?: number | null
  examination_name: string | null
  result_value: string | null
  examined_at: string | null
  created_at?: string
  updated_at?: string
}

export interface AntimicrobialStewardshipLabResultFormValues {
  antimicrobial_stewardship_form_id?: number | null
  lab_result_id?: number | null
  examination_name?: string | null
  result_value?: string | null
  examined_at?: string | null
}
