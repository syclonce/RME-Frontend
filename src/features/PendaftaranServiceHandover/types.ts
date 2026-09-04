export interface ServiceHandover {
  id: number
  visit_id: number | null
  ward_id: number | null
  handed_over_at?: string | null
  notes?: string | null
  /**
   * pending → received / rejected (ServiceHandoverService). Sebelumnya hilang
   * dari tipe ini, sehingga layar tidak dapat menampilkan apakah serah terima
   * sudah diterima unit tujuan — padahal itulah pertanyaan utamanya.
   */
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface ServiceHandoverFormValues {
  visit_id?: number | null
  ward_id?: number | null
  handed_over_at?: string | null
  notes?: string | null
}
