export interface AntimicrobialStewardshipPriorHistory {
  id: number
  antimicrobial_stewardship_form_id: number | null
  previous_antibiotic: string | null
  start_date?: string | null
  end_date?: string | null
  outcome?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface AntimicrobialStewardshipPriorHistoryFormValues {
  antimicrobial_stewardship_form_id?: number | null
  previous_antibiotic?: string | null
  start_date?: string | null
  end_date?: string | null
  outcome?: string | null
  notes?: string | null
}
