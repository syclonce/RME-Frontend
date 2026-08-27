export interface ImagingOrder {
  id: number
  visit_id: number | null
  modality: string | null
  body_part: string | null
  ordered_by: number | null
  ordered_at: string | null
  created_at?: string
  updated_at?: string
}

export interface ImagingOrderFormValues {
  visit_id?: number | null
  modality?: string | null
  body_part?: string | null
  ordered_by?: number | null
  ordered_at?: string | null
}
