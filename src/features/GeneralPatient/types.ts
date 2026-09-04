export interface Patient {
  id: number
  medical_record_number?: string | null
  nik?: string | null
  /** No. BPJS — bagian Identitas pasien (setara NIK), field dedicated karena
   * butuh metadata tambahan nanti (eligibilitas/kelas rawat) yang beda dari
   * kartu identitas generik (identity_card_types). Bukan bagian Coverage/Penjamin. */
  no_bpjs?: string | null
  /** Derived read-only dari outbox satu_sehat_staging_submissions — hanya
   * terisi di response GET /patients/{id} (show), tidak ada di list/index. */
  satusehat_sync_status?: 'not_submitted' | 'pending' | 'sent' | 'failed' | string | null
  satusehat_id?: string | null
  name: string | null
  nickname?: string | null
  title_prefix?: string | null
  title_suffix?: string | null
  birth_place?: string | null
  birth_date?: string | null
  gender_id?: number | null
  religion_id?: number | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  village_id?: number | null
  education_id?: number | null
  occupation_id?: number | null
  marital_status_id?: number | null
  blood_type_id?: number | null
  nationality_id?: number | null
  ethnicity_id?: number | null
  language_id?: number | null
  is_unidentified?: boolean | null
  patient_status_id?: number | null
  patient_type_id?: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PatientFormValues {
  medical_record_number?: string | null
  nik?: string | null
  no_bpjs?: string | null
  name?: string | null
  nickname?: string | null
  title_prefix?: string | null
  title_suffix?: string | null
  birth_place?: string | null
  birth_date?: string | null
  gender_id?: number | null
  religion_id?: number | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  village_id?: number | null
  education_id?: number | null
  occupation_id?: number | null
  marital_status_id?: number | null
  blood_type_id?: number | null
  nationality_id?: number | null
  ethnicity_id?: number | null
  language_id?: number | null
  is_unidentified?: boolean | null
  patient_status_id?: number | null
  patient_type_id?: number | null
  is_active?: boolean | null
}
