export interface EyeExamination {
  id: number
  visit_id: number | null
  side?: string | null
  visual_acuity?: string | null
  pupil_size_mm?: number | null
  pupil_reflex?: string | null
  conjunctiva?: string | null
  sclera?: string | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface EyeExaminationFormValues {
  visit_id?: number | null
  side?: string | null
  visual_acuity?: string | null
  pupil_size_mm?: number | null
  pupil_reflex?: string | null
  conjunctiva?: string | null
  sclera?: string | null
  findings?: string | null
  examined_at?: string | null
}
