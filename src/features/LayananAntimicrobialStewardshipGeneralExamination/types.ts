export interface AntimicrobialStewardshipGeneralExamination {
  id: number
  antimicrobial_stewardship_form_id: number | null
  temperature?: number | null
  pulse?: number | null
  respiration_rate?: number | null
  blood_pressure?: string | null
  weight_kg?: number | null
  height_cm?: number | null
  examined_at: string | null
  created_at?: string
  updated_at?: string
}

export interface AntimicrobialStewardshipGeneralExaminationFormValues {
  antimicrobial_stewardship_form_id?: number | null
  temperature?: number | null
  pulse?: number | null
  respiration_rate?: number | null
  blood_pressure?: string | null
  weight_kg?: number | null
  height_cm?: number | null
  examined_at?: string | null
}
