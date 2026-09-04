import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeList } from '@/shared/types'
import type { CriticalLabValue } from './types'

export const LayananCriticalLabValueEndpoint = '/critical-lab-values'

export function useCriticalLabValueResource() {
  return useCrudResource<CriticalLabValue>(LayananCriticalLabValueEndpoint)
}

const KEY = [LayananCriticalLabValueEndpoint, 'worklist']

/**
 * Daftar kerja nilai kritis.
 *
 * `refetchInterval` 60 detik: ini satu-satunya layar di aplikasi ini yang
 * kelambatannya berarti pasien tidak ditangani. Nilai kritis yang masuk saat
 * layar terbuka harus muncul tanpa petugas menekan apa pun.
 */
export function useCriticalLabWorklist(unacknowledgedOnly: boolean) {
  return useQuery({
    queryKey: [...KEY, unacknowledgedOnly],
    queryFn: async () => {
      const res = await apiClient.get(LayananCriticalLabValueEndpoint, {
        params: { per_page: 100, ...(unacknowledgedOnly ? { unacknowledged: 1 } : {}) },
      })
      return normalizeList<CriticalLabValue>(res.data).items
    },
    refetchInterval: 60_000,
    staleTime: 30_000,
  })
}

export function useNotifyCriticalLabValue() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, notifiedTo }: { id: number; notifiedTo: string }) => {
      const res = await apiClient.post(`${LayananCriticalLabValueEndpoint}/${id}/notify`, {
        notified_to: notifiedTo,
      })
      return res.data?.data ?? res.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useAcknowledgeCriticalLabValue() {
  const queryClient = useQueryClient()

  return useMutation({
    // Tanpa payload: siapa dan kapan diambil server dari konteks request.
    mutationFn: async (id: number) => {
      const res = await apiClient.post(`${LayananCriticalLabValueEndpoint}/${id}/acknowledge`)
      return res.data?.data ?? res.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}
