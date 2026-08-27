export interface PathologyMolecularResult {
  id: number
  pathology_anatomy_result_id: number | null
  test_name: string | null
  result: string | null
  examined_at: string | null
  created_at?: string
  updated_at?: string
}

export interface PathologyMolecularResultFormValues {
  pathology_anatomy_result_id?: number | null
  test_name?: string | null
  result?: string | null
  examined_at?: string | null
}
