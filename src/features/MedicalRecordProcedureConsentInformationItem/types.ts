export interface ProcedureConsentInformationItem {
  id: number
  information_id: number | null
  item_name: string | null
  is_explained?: boolean | null
  is_understood?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ProcedureConsentInformationItemFormValues {
  information_id?: number | null
  item_name?: string | null
  is_explained?: boolean | null
  is_understood?: boolean | null
}
