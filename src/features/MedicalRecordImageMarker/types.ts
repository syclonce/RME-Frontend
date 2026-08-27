export interface ImageMarker {
  id: number
  visit_id: number | null
  image_path: string | null
  template_name?: string | null
  notes?: string | null
  marked_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ImageMarkerFormValues {
  visit_id?: number | null
  image_path?: string | null
  template_name?: string | null
  notes?: string | null
  marked_at?: string | null
}
