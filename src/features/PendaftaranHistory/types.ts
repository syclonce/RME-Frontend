export interface PendaftaranHistory {
  id: number
  registration_id: number | null
  old_status?: string | null
  new_status: string | null
  changed_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  changed_by?: number | null
}

export interface PendaftaranHistoryFormValues {
  registration_id?: number | null
  old_status?: string | null
  new_status?: string | null
  changed_at?: string | null
  notes?: string | null
}
