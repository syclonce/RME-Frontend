export interface EmgExamination {
  id: number
  visit_id: number | null
  patient_id: number | null
  nerve_conduction_velocity?: number | null
  spontaneous_activity?: string | null
  motor_unit_potentials?: string | null
  recruitment_pattern?: string | null
  conclusion?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface EmgExaminationFormValues {
  visit_id?: number | null
  patient_id?: number | null
  nerve_conduction_velocity?: number | null
  spontaneous_activity?: string | null
  motor_unit_potentials?: string | null
  recruitment_pattern?: string | null
  conclusion?: string | null
  examined_at?: string | null
}
