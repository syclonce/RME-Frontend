/**
 * Konteks kunjungan aktif — penghubung antara workspace Pelayanan Pasien
 * (`/pelayanan-pasien/:visitId`) dan modul-modul klinis yang dibukanya.
 *
 * Legacy SIMGOS2 tidak punya padanan langsung: di sana seluruh formulir klinis
 * hidup di dalam satu workspace ExtJS, sehingga konteks kunjungan tersedia dari
 * induk komponen tanpa perlu diedarkan. SIMGOS memakai halaman terpisah per
 * modul, jadi konteksnya harus dibawa eksplisit.
 *
 * Dua jalur, sengaja:
 * - query `?visit_id=` — jalur utama, membuat URL dapat dibagikan dan di-bookmark
 * - `sessionStorage` — cadangan agar konteks bertahan saat pengguna berpindah
 *   antar modul lewat sidebar (yang tidak membawa query)
 *
 * Query selalu menang atas sessionStorage supaya tautan eksplisit tidak
 * ditimpa sisa konteks lama.
 */

const STORAGE_KEY = 'simgos.activeVisitId'

function parseVisitId(raw: string | null | undefined): number | null {
  if (!raw) return null
  const n = Number(raw)
  return Number.isFinite(n) && n > 0 ? n : null
}

/** Baca konteks dari sessionStorage. Aman dipanggil saat storage diblokir. */
export function readStoredVisitId(): number | null {
  try {
    return parseVisitId(sessionStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

/** Simpan konteks; `null` menghapusnya. */
export function setActiveVisitId(visitId: number | null): void {
  try {
    if (visitId === null) sessionStorage.removeItem(STORAGE_KEY)
    else sessionStorage.setItem(STORAGE_KEY, String(visitId))
  } catch {
    // storage diblokir (mode privat) — konteks tetap jalan lewat query
  }
}

/**
 * Kunjungan aktif menurut query lalu sessionStorage.
 * `search` diambil dari `useLocation().search` agar dapat diuji tanpa router.
 */
export function resolveActiveVisitId(search: string): number | null {
  const fromQuery = parseVisitId(new URLSearchParams(search).get('visit_id'))
  if (fromQuery !== null) {
    setActiveVisitId(fromQuery)
    return fromQuery
  }
  return readStoredVisitId()
}
