export interface TreatmentProtocolStepDrug {
  id: number
  treatment_protocol_step_id: number | null
  drug_name: string | null
  dosage: string | null
  frequency: string | null
  route?: string | null
  created_at?: string
  updated_at?: string
}

export interface TreatmentProtocolStepDrugFormValues {
  treatment_protocol_step_id?: number | null
  drug_name?: string | null
  dosage?: string | null
  frequency?: string | null
  route?: string | null
}
