import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Visit } from './types'

export const PendaftaranVisitEndpoint = '/visits'

export function useVisitResource() {
  return useCrudResource<Visit>(PendaftaranVisitEndpoint)
}

/**
 * Finalisasi pelayanan kunjungan — TERPISAH dari finalisasi RME dan dari
 * pemulangan pasien.
 *
 * Urutannya ditegakkan backend dan tidak dapat dilompati:
 *
 *   RME final -> pelayanan final -> pembayaran boleh diposting
 *
 * Tanpa langkah tengah ini, POST /payments ditolak dengan "Pelayanan kunjungan
 * belum difinalkan." — dan sebelum ada tombolnya, tidak ada cara sama sekali
 * melewati gerbang itu dari layar mana pun.
 */
export function useFinalizeVisitService(visitId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.post(`${PendaftaranVisitEndpoint}/${visitId}/finalize-service`)
      return (res.data?.data ?? res.data) as Visit
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['active-visit', visitId] })
      queryClient.invalidateQueries({ queryKey: ['pelayanan-pasien', visitId] })
    },
  })
}
