export interface LabCultureResult {
  id: number
  lab_order_id: number | null
  specimen_type: string | null
  organism_found?: string | null
  colony_count?: string | null
  examined_at: string | null
  result_status: string | null
  created_at?: string
  updated_at?: string
}

export interface LabCultureResultFormValues {
  lab_order_id?: number | null
  specimen_type?: string | null
  organism_found?: string | null
  colony_count?: string | null
  examined_at?: string | null
  result_status?: string | null
}
