import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeList } from '@/shared/types'
import type { VisitDestination } from './types'

export const PendaftaranVisitDestinationEndpoint = '/pendaftaranvisitdestinations'

/**
 * Daftar antrean poli untuk satu ward: tujuan pasien yang belum diterima
 * (pending_only=1). Query di-enable hanya saat wardId terpilih supaya tidak
 * memuat seluruh ward sekaligus saat halaman pertama kali dibuka.
 */
export function useVisitDestinationQueue(wardId: number | undefined) {
  return useQuery({
    queryKey: [PendaftaranVisitDestinationEndpoint, 'queue', wardId],
    queryFn: async () => {
      const res = await apiClient.get(PendaftaranVisitDestinationEndpoint, {
        params: { ward_id: wardId, pending_only: 1 },
      })
      return normalizeList<VisitDestination>(res.data).items
    },
    enabled: wardId !== undefined,
  })
}
