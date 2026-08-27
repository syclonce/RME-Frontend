export interface Prescription {
  id: number
  prescription_number?: string | null
  visit_id: number | null
  diagnosis_id?: number | null
  prescribed_by: number | null
  prescribed_at?: string | null
  weight_kg?: number | null
  height_cm?: number | null
  has_drug_allergy?: boolean | null
  is_pregnant?: boolean | null
  is_breastfeeding?: boolean | null
  is_discharge_prescription?: boolean | null
  is_emergency?: boolean | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface PrescriptionFormValues {
  prescription_number?: string | null
  visit_id?: number | null
  diagnosis_id?: number | null
  prescribed_by?: number | null
  prescribed_at?: string | null
  weight_kg?: number | null
  height_cm?: number | null
  has_drug_allergy?: boolean | null
  is_pregnant?: boolean | null
  is_breastfeeding?: boolean | null
  is_discharge_prescription?: boolean | null
  is_emergency?: boolean | null
  notes?: string | null
}
