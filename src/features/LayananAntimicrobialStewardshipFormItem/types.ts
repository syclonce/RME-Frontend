export interface AntimicrobialStewardshipFormItem {
  id: number
  antimicrobial_stewardship_form_id: number | null
  item_id?: number | null
  dose: string | null
  route: string | null
  frequency: string | null
  planned_duration_days?: number | null
  created_at?: string
  updated_at?: string
}

export interface AntimicrobialStewardshipFormItemFormValues {
  antimicrobial_stewardship_form_id?: number | null
  item_id?: number | null
  dose?: string | null
  route?: string | null
  frequency?: string | null
  planned_duration_days?: number | null
}
