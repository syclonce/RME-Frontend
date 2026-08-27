/**
 * Backend RME-Backend TIDAK seragam 100%: sebagian modul (yang punya class
 * Resource) membungkus respons dalam `{ data: ... }` (+ `meta`/`links` untuk
 * list), sebagian modul sederhana mengembalikan Eloquent model/paginator
 * mentah (list-nya `{ current_page, data: [...], last_page, total, ... }`
 * langsung di root, show()-nya objek polos tanpa wrapper). Helper di bawah
 * menormalkan kedua bentuk supaya kode fitur tidak perlu tahu bedanya.
 */

export interface NormalizedList<T> {
  items: T[]
  currentPage: number
  lastPage: number
  total: number
}

export function normalizeList<T>(raw: unknown): NormalizedList<T> {
  const r = raw as Record<string, unknown>
  // Bentuk Resource::collection() paginated: { data: [...], meta: { current_page, last_page, total } }
  if (Array.isArray(r?.data) && r?.meta && typeof r.meta === 'object') {
    const meta = r.meta as Record<string, unknown>
    return {
      items: r.data as T[],
      currentPage: Number(meta.current_page ?? 1),
      lastPage: Number(meta.last_page ?? 1),
      total: Number(meta.total ?? (r.data as unknown[]).length),
    }
  }
  // Bentuk paginate() Laravel polos: { current_page, data: [...], last_page, total }
  if (Array.isArray(r?.data) && 'current_page' in r) {
    return {
      items: r.data as T[],
      currentPage: Number(r.current_page ?? 1),
      lastPage: Number(r.last_page ?? 1),
      total: Number(r.total ?? (r.data as unknown[]).length),
    }
  }
  // Array polos tanpa pagination sama sekali.
  if (Array.isArray(raw)) {
    return { items: raw as T[], currentPage: 1, lastPage: 1, total: (raw as unknown[]).length }
  }
  return { items: [], currentPage: 1, lastPage: 1, total: 0 }
}

export function normalizeItem<T>(raw: unknown): T {
  const r = raw as Record<string, unknown>
  if (r && typeof r === 'object' && 'data' in r && typeof r.data === 'object' && r.data !== null) {
    return r.data as T
  }
  return raw as T
}
