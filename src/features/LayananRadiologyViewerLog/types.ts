export interface RadiologyViewerLog {
  id: number
  visit_id: number | null
  accession_number?: string | null
  viewed_by: number | null
  viewed_at: string | null
  ip_address?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface RadiologyViewerLogFormValues {
  visit_id?: number | null
  accession_number?: string | null
  viewed_by?: number | null
  viewed_at?: string | null
  ip_address?: string | null
  notes?: string | null
}
