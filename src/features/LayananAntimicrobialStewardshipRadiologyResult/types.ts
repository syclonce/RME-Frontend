export interface AntimicrobialStewardshipRadiologyResult {
  id: number
  antimicrobial_stewardship_form_id: number | null
  examination_name: string | null
  findings: string | null
  examined_at: string | null
  created_at?: string
  updated_at?: string
}

export interface AntimicrobialStewardshipRadiologyResultFormValues {
  antimicrobial_stewardship_form_id?: number | null
  examination_name?: string | null
  findings?: string | null
  examined_at?: string | null
}
