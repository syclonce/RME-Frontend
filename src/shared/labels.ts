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
