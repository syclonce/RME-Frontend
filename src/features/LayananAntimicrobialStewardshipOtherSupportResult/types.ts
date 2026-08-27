export interface AntimicrobialStewardshipOtherSupportResult {
  id: number
  antimicrobial_stewardship_form_id: number | null
  examination_name: string | null
  result_value: string | null
  examined_at: string | null
  created_at?: string
  updated_at?: string
}

export interface AntimicrobialStewardshipOtherSupportResultFormValues {
  antimicrobial_stewardship_form_id?: number | null
  examination_name?: string | null
  result_value?: string | null
  examined_at?: string | null
}
