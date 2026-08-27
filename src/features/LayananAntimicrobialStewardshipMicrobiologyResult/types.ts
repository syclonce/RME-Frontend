export interface AntimicrobialStewardshipMicrobiologyResult {
  id: number
  antimicrobial_stewardship_form_id: number | null
  specimen_type: string | null
  organism_found?: string | null
  sensitivity_result?: string | null
  examined_at: string | null
  created_at?: string
  updated_at?: string
}

export interface AntimicrobialStewardshipMicrobiologyResultFormValues {
  antimicrobial_stewardship_form_id?: number | null
  specimen_type?: string | null
  organism_found?: string | null
  sensitivity_result?: string | null
  examined_at?: string | null
}
