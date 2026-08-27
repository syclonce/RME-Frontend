export interface NeckExamination {
  id: number
  visit_id: number | null
  lymph_nodes?: string | null
  thyroid?: string | null
  jugular_venous_pressure?: string | null
  trachea_position?: string | null
  mass: boolean | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface NeckExaminationFormValues {
  visit_id?: number | null
  lymph_nodes?: string | null
  thyroid?: string | null
  jugular_venous_pressure?: string | null
  trachea_position?: string | null
  mass?: boolean | null
  findings?: string | null
  examined_at?: string | null
}
