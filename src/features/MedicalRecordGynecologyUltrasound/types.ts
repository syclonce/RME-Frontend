export interface GynecologyUltrasound {
  id: number
  patient_id: number | null
  visit_id: number | null
  doctor_id?: number | null
  exam_date: string | null
  uterus_findings?: string | null
  right_ovary_findings?: string | null
  left_ovary_findings?: string | null
  endometrial_thickness_mm?: number | null
  conclusion?: string | null
  created_at?: string
  updated_at?: string
}

export interface GynecologyUltrasoundFormValues {
  patient_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  exam_date?: string | null
  uterus_findings?: string | null
  right_ovary_findings?: string | null
  left_ovary_findings?: string | null
  endometrial_thickness_mm?: number | null
  conclusion?: string | null
}
