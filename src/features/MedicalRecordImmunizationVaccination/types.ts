export interface ImmunizationVaccination {
  id: number
  patient_id: number | null
  visit_id?: number | null
  vaccine_name: string | null
  dose_number?: number | null
  batch_number?: string | null
  administered_at: string | null
  administered_by: number | null
  site?: string | null
  route?: string | null
  adverse_reaction?: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface ImmunizationVaccinationFormValues {
  patient_id?: number | null
  visit_id?: number | null
  vaccine_name?: string | null
  dose_number?: number | null
  batch_number?: string | null
  administered_at?: string | null
  administered_by?: number | null
  site?: string | null
  route?: string | null
  adverse_reaction?: string | null
  status?: string | null
}
