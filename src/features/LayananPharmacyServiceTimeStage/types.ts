export interface PharmacyServiceTimeStage {
  id: number
  pharmacy_service_time_id: number | null
  stage_name: string | null
  recorded_at: string | null
  recorded_by?: number | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyServiceTimeStageFormValues {
  pharmacy_service_time_id?: number | null
  stage_name?: string | null
  recorded_at?: string | null
  recorded_by?: number | null
}
