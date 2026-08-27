import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeList } from '@/shared/types'

export interface Option {
  id: number
  label: string
}

function pickLabel(row: Record<string, unknown>): string {
  const candidate = row.name ?? row.title ?? row.code ?? row.username ?? row.description
  return candidate !== undefined && candidate !== null ? String(candidate) : `#${row.id}`
}

/**
 * Dropdown lookup generik untuk field relasi FK. Ambil halaman pertama saja
 * (cukup untuk tabel referensi/master yang kecil) - tabel besar (mis. pasien,
 * pegawai) butuh combobox cari-sambil-ketik terpisah, BELUM dibuat di sini.
 *
 * per_page DIBATASI 100 (bukan lebih) - sebagian controller RME-Backend
 * menegakkan `per_page <= 100` sebagai hardening pasca-pentest (lihat memori
 * rme-backend-batch23-modules/strix-pentest); minta lebih dari itu berakhir
 * 422 dan dropdown gagal total, bukan sekadar terpotong.
 */
export function useOptions(endpoint: string | null) {
  return useQuery({
    queryKey: [endpoint, 'options'],
    queryFn: async () => {
      const res = await apiClient.get(endpoint as string, { params: { per_page: 100 } })
      const { items } = normalizeList<Record<string, unknown>>(res.data)
      return items.map((row) => ({ id: Number(row.id), label: pickLabel(row) }) satisfies Option)
    },
    enabled: endpoint !== null,
  })
}
