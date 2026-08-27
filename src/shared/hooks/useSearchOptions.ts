import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeList } from '@/shared/types'
import type { Option } from './useOptions'

function pickLabel(row: Record<string, unknown>): string {
  const candidate = row.name ?? row.title ?? row.code ?? row.username ?? row.description
  return candidate !== undefined && candidate !== null ? String(candidate) : `#${row.id}`
}

/**
 * Hook untuk combobox cari-sambil-ketik (FK ke tabel besar seperti pasien,
 * pegawai). Gunakan `useOptions` biasa untuk tabel referensi/master kecil.
 *
 * Backend RME-Backend dominan pakai parameter `?name=` untuk search
 * (terverifikasi di Patient/Employee/Service controller). Debounce 300ms
 * built-in di komponen pemanggil via local state search term.
 */
export function useSearchOptions(endpoint: string | null, search: string) {
  return useQuery({
    queryKey: [endpoint, 'search', search],
    queryFn: async () => {
      const params: Record<string, unknown> = { per_page: 50 }
      if (search) params.name = search
      const res = await apiClient.get(endpoint as string, { params })
      const { items } = normalizeList<Record<string, unknown>>(res.data)
      return items.map((row) => ({ id: Number(row.id), label: pickLabel(row) }) satisfies Option)
    },
    enabled: endpoint !== null,
    placeholderData: keepPreviousData,
  })
}
