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

export interface ImagingStudy {
  id: number
  imaging_order_id: number | null
  study_instance_uid?: string | null
  performed_at?: string | null
  findings_summary?: string | null
  report_url?: string | null
  created_at?: string
  updated_at?: string
}

export interface ImagingStudyFormValues {
  imaging_order_id?: number | null
  study_instance_uid?: string | null
  performed_at?: string | null
  findings_summary?: string | null
  report_url?: string | null
}
