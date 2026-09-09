import { isAxiosError } from 'axios'
import { toast } from 'sonner'

/**
 * Bentuk galat validasi Laravel (HTTP 422):
 * `{ message: "...", errors: { field: ["pesan 1", "pesan 2"] } }`
 */
interface LaravelValidationErrorBody {
  message?: string
  errors?: Record<string, string[]>
}

/** Hasil ekstraksi galat API dalam bentuk yang siap ditampilkan. */
export interface ApiErrorInfo {
  /** Judul ringkas untuk toast. */
  title: string
  /** Rincian per baris — kosong bila galat bukan validasi. */
  details: string[]
  /** Peta `field` → pesan pertama, untuk menandai input yang bermasalah. */
  fieldErrors: Record<string, string>
}

/**
 * Terjemahkan galat apa pun dari `apiClient` menjadi pesan berbahasa manusia.
 *
 * Dipisah dari `notifyApiError` supaya pemanggil yang butuh menandai field
 * (mis. form wizard) bisa memakai `fieldErrors` tanpa ikut memunculkan toast.
 */
export function extractApiError(error: unknown): ApiErrorInfo {
  if (!isAxiosError(error)) {
    return {
      title: error instanceof Error ? error.message : 'Terjadi kesalahan tidak dikenal.',
      details: [],
      fieldErrors: {},
    }
  }

  // Server tidak terjangkau — bedakan dari galat yang dikirim server, karena
  // penanganannya berbeda bagi petugas (cek jaringan vs perbaiki isian).
  if (!error.response) {
    return {
      title: 'Tidak dapat menghubungi server. Periksa koneksi Anda.',
      details: [],
      fieldErrors: {},
    }
  }

  const status = error.response.status
  const body = error.response.data as LaravelValidationErrorBody | undefined

  if (status === 422 && body?.errors) {
    const fieldErrors: Record<string, string> = {}
    const details: string[] = []

    for (const [field, messages] of Object.entries(body.errors)) {
      const first = messages[0]
      if (!first) continue
      fieldErrors[field] = first
      details.push(first)
    }

    return { title: 'Periksa kembali isian Anda.', details, fieldErrors }
  }

  if (status === 403) {
    return { title: 'Anda tidak memiliki akses untuk tindakan ini.', details: [], fieldErrors: {} }
  }

  if (status === 404) {
    return { title: 'Data yang dituju tidak ditemukan.', details: [], fieldErrors: {} }
  }

  if (status >= 500) {
    return {
      title: 'Terjadi kesalahan di server.',
      // Pesan mentah server (mis. galat SQL) sengaja TIDAK ditampilkan ke
      // pengguna — di SIMpel legacy hal ini membocorkan nama kolom ke layar
      // dokter. Detailnya tetap masuk console untuk kebutuhan debugging.
      details: [],
      fieldErrors: {},
    }
  }

  return { title: body?.message ?? 'Permintaan gagal diproses.', details: [], fieldErrors: {} }
}

/**
 * Tampilkan galat API sebagai toast. Kembalikan `fieldErrors` supaya pemanggil
 * dapat sekaligus menandai input yang bermasalah.
 */
export function notifyApiError(error: unknown): Record<string, string> {
  const { title, details } = extractApiError(error)

  if (import.meta.env.DEV) console.error('[API error]', error)

  toast.error(title, {
    description: details.length > 0 ? details.join('\n') : undefined,
  })

  return extractApiError(error).fieldErrors
}
