export interface PathologyImmunofluorescenceResult {
  id: number
  pathology_anatomy_result_id: number | null
  marker: string | null
  result: string | null
  intensity?: string | null
  examined_at: string | null
  created_at?: string
  updated_at?: string
}

export interface PathologyImmunofluorescenceResultFormValues {
  pathology_anatomy_result_id?: number | null
  marker?: string | null
  result?: string | null
  intensity?: string | null
  examined_at?: string | null
}
