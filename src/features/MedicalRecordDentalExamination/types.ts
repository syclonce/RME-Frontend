export interface DentalExamination {
  id: number
  visit_id: number | null
  decayed_teeth_count?: number | null
  missing_teeth_count?: number | null
  filled_teeth_count?: number | null
  odontogram_json?: string | null
  occlusion_status?: string | null
  notes?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface DentalExaminationFormValues {
  visit_id?: number | null
  decayed_teeth_count?: number | null
  missing_teeth_count?: number | null
  filled_teeth_count?: number | null
  odontogram_json?: string | null
  occlusion_status?: string | null
  notes?: string | null
  examined_at?: string | null
}
