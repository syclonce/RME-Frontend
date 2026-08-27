export interface DrugInteractionRule {
  id: number
  item_id_a: number | null
  item_id_b: number | null
  severity: string | null
  clinical_note: string | null
  created_at?: string
  updated_at?: string
}

export interface DrugInteractionRuleFormValues {
  item_id_a?: number | null
  item_id_b?: number | null
  severity?: string | null
  clinical_note?: string | null
}
