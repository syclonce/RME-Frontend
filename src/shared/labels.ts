/**
 * Central humanization for module/field names — everything else in the app
 * (sidebar, page titles, table headers, form labels) should call these
 * instead of printing raw PascalCase module names or snake_case DB columns.
 */

// Keyed by the RAW PascalCase prefix exactly as it appears at the start of a
// module name — some domains are two words in the source (e.g. "BerkasKlaim",
// "MedicalRecord"), so matching must happen BEFORE generic word-splitting or
// the shared word ("Klaim", "Record") gets printed twice (translated prefix
// + untranslated remainder). Sorted longest-first at use time so a 2-word
// prefix always wins over its 1-word sub-match.
const DOMAIN_LABELS: Record<string, string> = {
  General: 'Umum',
  Audit: 'Audit',
  Authorization: 'Otorisasi',
  Auth: 'Autentikasi',
  Aplikasi: 'Aplikasi',
  BerkasKlaim: 'Berkas Klaim',
  Berkas: 'Berkas',
  Bpjs: 'BPJS',
  Finance: 'Keuangan',
  Inventory: 'Inventaris',
  Layanan: 'Layanan',
  MedicalRecord: 'Rekam Medis',
  Pegawai: 'Pegawai',
  Pembayaran: 'Pembayaran',
  Pendaftaran: 'Pendaftaran',
  Penjamin: 'Penjamin',
  SatuSehat: 'SatuSehat',
  Sisrute: 'Sisrute',
  Sitb: 'SITB',
  RsOnline: 'RS Online',
  SirsOnlineBor: 'SIRS Online BOR',
  System: 'Sistem',
  EKlaim: 'e-Klaim',
  Grup: 'Grup',
  Cetakan: 'Cetakan',
  Dashboard: 'Dasbor',
  Kemkes: 'Kemkes',
  Pasien: 'Pasien',
  Pembatalan: 'Pembatalan',
  Penjualan: 'Penjualan',
}

/** Raw prefixes sorted longest-first so "BerkasKlaim" wins over "Berkas". */
const DOMAIN_PREFIXES_BY_LENGTH = Object.keys(DOMAIN_LABELS).sort((a, b) => b.length - a.length)

const FIELD_LABELS: Record<string, string> = {
  id: 'ID',
  name: 'Nama',
  nickname: 'Nama Panggilan',
  title_prefix: 'Gelar Depan',
  title_suffix: 'Gelar Belakang',
  medical_record_number: 'No. Rekam Medis',
  birth_place: 'Tempat Lahir',
  birth_date: 'Tanggal Lahir',
  gender_id: 'Jenis Kelamin',
  religion_id: 'Agama',
  marital_status_id: 'Status Perkawinan',
  blood_type_id: 'Golongan Darah',
  nationality_id: 'Kebangsaan',
  ethnicity_id: 'Suku',
  language_id: 'Bahasa',
  occupation_id: 'Pekerjaan',
  education_id: 'Pendidikan',
  village_id: 'Desa/Kelurahan',
  address: 'Alamat',
  postal_code: 'Kode Pos',
  is_active: 'Aktif',
  is_unidentified: 'Tidak Dikenal',
  registered_by: 'Dicatat Oleh',
  created_at: 'Dibuat',
  updated_at: 'Diperbarui',
  status: 'Status',
  code: 'Kode',
  description: 'Keterangan',
  phone: 'No. Telepon',
  email: 'Surel',

  // BPJS (VClaim/general sync)
  bpjs_code: 'Kode BPJS',
  bpjs_error: 'Pesan Error BPJS',
  bpjs_message: 'Pesan BPJS',
  bpjs_no_pelayanan: 'No. Pelayanan BPJS',
  bpjs_no_pelayanan_obat: 'No. Pelayanan Obat BPJS',
  bpjs_no_pendaftaran: 'No. Pendaftaran BPJS',
  bpjs_no_resep: 'No. Resep BPJS',
  bpjs_response: 'Respons BPJS',
  bpjs_room_id: 'Ruang BPJS',
  bpjs_sync_status: 'Status Sinkronisasi BPJS',
  deleted_at_bpjs: 'Waktu Hapus (BPJS)',
  no_bpjs: 'No. BPJS',

  // ICD
  icd_code: 'Kode ICD',
  icd_description: 'Deskripsi ICD',
  kode_icd_x: 'Kode ICD-X',

  // SATUSEHAT
  satu_sehat_consent: 'Persetujuan SATUSEHAT',
  satusehat_id: 'ID SATUSEHAT',
  satu_sehat_staging_submission_id: 'ID Pengiriman Staging SATUSEHAT',

  // Identity / SEP / SPRI / SIP / SMF / DPJP
  nik: 'NIK',
  no_sep: 'No. SEP',
  no_sep_asal: 'No. SEP Asal',
  tgl_sep: 'Tanggal SEP',
  sep_id: 'SEP',
  no_spri: 'No. SPRI',
  dpjp_doctor_id: 'Dokter DPJP',
  sip_number: 'No. SIP',
  smf_id: 'SMF',
  tgl_lahir: 'Tanggal Lahir',

  // Assessment scores / classifications
  adl_score: 'Skor ADL',
  adl_status: 'Status ADL',
  asa_classification: 'Klasifikasi ASA',

  // JKN quotas (BPJS Antrean)
  kuotajkn: 'Kuota JKN',
  kuotanonjkn: 'Kuota Non-JKN',
  sisakuotajkn: 'Sisa Kuota JKN',
  sisakuotanonjkn: 'Sisa Kuota Non-JKN',

  // SITB (TB reporting, Kemkes)
  kd_wasor: 'Kode Wasor TB',
  kd_fasyankes: 'Kode Fasyankes',
  kd_kabupaten_faskes: 'Kabupaten Faskes',
  kd_kabupaten_pasien: 'Kabupaten Pasien',
  kd_pasien: 'Kode Pasien',
  id_propinsi_faskes: 'Provinsi Faskes',
  nourut_pasien: 'Nomor Urut Pasien',
  id_tb_03: 'ID TB.03',
  noregkab: 'No. Reg Kabupaten',
  noreglab_bulan_2: 'No. Reg Lab Bulan 2',
  noreglab_bulan_3: 'No. Reg Lab Bulan 3',
  noreglab_bulan_5: 'No. Reg Lab Bulan 5',
  akhir_pengobatan_noreglab: 'No. Reg Lab Akhir Pengobatan',
  paduan_oat: 'Paduan OAT',
  art: 'ART',
  tb_dm: 'TB-DM',
  terapi_dm: 'Terapi DM',
  pindah_ro: 'Pindah RO',
  toraks_tdk_dilakukan: 'Toraks Tidak Dilakukan',
  konfirmasiSkoring5: 'Konfirmasi Skoring 5',
  konfirmasiSkoring6: 'Konfirmasi Skoring 6',

  // PPK / JPK
  ppk: 'PPK',
  ppk_id: 'PPK',
  ppk_tujuan: 'PPK Tujuan',
  jpk: 'Jenis Pelayanan Kesehatan',

  // BPJS Antrean payload (FKTP/RS queue booking)
  kodebooking: 'Kode Booking',
  jenispasien: 'Jenis Pasien',
  nomorkartu: 'Nomor Kartu',
  nohp: 'No. HP',
  kodepoli: 'Kode Poli',
  namapoli: 'Nama Poli',
  pasienbaru: 'Pasien Baru',
  tanggalperiksa: 'Tanggal Periksa',
  kodedokter: 'Kode Dokter',
  namadokter: 'Nama Dokter',
  jampraktek: 'Jam Praktik',
  jeniskunjungan: 'Jenis Kunjungan',
  nomorreferensi: 'Nomor Referensi',
  nomorantrean: 'Nomor Antrean',
  angkaantrean: 'Angka Antrean',
  estimasidilayani: 'Estimasi Dilayani',

  // Misc abbreviations
  ip: 'Alamat IP',
  url: 'URL',
  uri: 'URI',
  spo2: 'SpO2',
}

/** Split "GeneralPatientFamilyContact" into ["General", "Patient", "Family", "Contact"]. */
function splitPascalCase(input: string): string[] {
  return input.match(/[A-Z][a-z0-9]*/g) ?? [input]
}

/**
 * "GeneralPatientFamilyContact" -> "Kontak Keluarga Pasien"-ish: translate
 * the leading domain word via DOMAIN_LABELS, title-case the rest. Falls back
 * to a spaced-out PascalCase split for anything not in the dictionary rather
 * than ever showing the raw class name.
 */
export function humanizeModuleName(moduleName: string): string {
  const matchedPrefix = DOMAIN_PREFIXES_BY_LENGTH.find((p) => moduleName.startsWith(p))
  if (!matchedPrefix) return splitPascalCase(moduleName).join(' ')

  const domainLabel = DOMAIN_LABELS[matchedPrefix]
  const remainder = moduleName.slice(matchedPrefix.length)
  const remainderLabel = splitPascalCase(remainder).join(' ')

  return remainderLabel ? `${domainLabel} ${remainderLabel}` : domainLabel
}

/** Just the translated domain/group label, e.g. "General" -> "Umum". */
export function humanizeDomain(domain: string): string {
  return DOMAIN_LABELS[domain] ?? domain
}

/**
 * Extracts the RAW grouping prefix from a module name — the longest known
 * domain prefix it starts with (e.g. "BerkasKlaimClaimFile" -> "BerkasKlaim",
 * NOT just "Berkas"), falling back to the first PascalCase word for any
 * domain not yet in the dictionary. Used for sidebar grouping so the group
 * key and humanizeModuleName's prefix-stripping never disagree.
 */
export function domainPrefixOf(moduleName: string): string {
  const matched = DOMAIN_PREFIXES_BY_LENGTH.find((p) => moduleName.startsWith(p))
  if (matched) return matched
  const match = moduleName.match(/^[A-Z][a-z0-9]*/)
  return match ? match[0] : 'Lainnya'
}

/** "medical_record_number" -> "No. Rekam Medis", with a Title Case fallback for unknown fields. */
export function humanizeField(field: string): string {
  if (FIELD_LABELS[field]) return FIELD_LABELS[field]

  // Strip a trailing _id (foreign key) before falling back, so an unmapped
  // FK reads "Foo" instead of "Foo Id".
  const stripped = field.endsWith('_id') ? field.slice(0, -3) : field

  return stripped
    .split('_')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}
