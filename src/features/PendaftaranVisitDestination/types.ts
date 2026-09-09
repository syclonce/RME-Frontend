// Bentuk respons GET /pendaftaranvisitdestinations — satu baris = satu tujuan
// pasien yang BELUM diterima ruangan (antrean poli). Lihat
// Modules/PendaftaranVisitDestination/app/Http/Resources/VisitDestinationResource.php
// di RME-Backend untuk field lengkap.
export interface VisitDestination {
  id: number
  registration_id: number
  ward_id: number | null
  ward_name?: string | null
  doctor_id?: number | null
  doctor_name?: string | null
  follows_mother?: boolean | null
  mother_visit_id?: number | null
  status?: string | null
  created_at?: string | null
  created_by?: number | null
}
