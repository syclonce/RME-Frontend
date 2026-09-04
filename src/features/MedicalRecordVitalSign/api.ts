import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeList } from '@/shared/types'
import type { VitalSign, VitalSignFormValues } from './types'

export const MedicalRecordVitalSignEndpoint = '/vital-signs'

export function useVitalSignResource() {
  return useCrudResource<VitalSign>(MedicalRecordVitalSignEndpoint)
}

/**
 * Riwayat tanda vital satu kunjungan, terbaru di atas.
 *
 * Backend mengurutkan `latest('recorded_at')`, tapi halaman ini tidak
 * bergantung padanya — urutan yang benar terlalu penting untuk dititipkan
 * ke asumsi tentang endpoint.
 */
export function useVisitVitalSigns(visitId: number | null) {
  return useQuery({
    queryKey: [MedicalRecordVitalSignEndpoint, 'visit', visitId],
    enabled: visitId !== null && visitId > 0,
    queryFn: async () => {
      const res = await apiClient.get(MedicalRecordVitalSignEndpoint, {
        params: { visit_id: visitId, per_page: 50 },
      })
      return normalizeList<VitalSign>(res.data).items.sort((a, b) => {
        const at = a.recorded_at ? new Date(a.recorded_at).getTime() : 0
        const bt = b.recorded_at ? new Date(b.recorded_at).getTime() : 0
        return bt - at
      })
    },
  })
}

export function useRecordVitalSign(visitId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: VitalSignFormValues) => {
      const res = await apiClient.post(MedicalRecordVitalSignEndpoint, { ...values, visit_id: visitId })
      return res.data?.data ?? res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MedicalRecordVitalSignEndpoint, 'visit', visitId] })
    },
  })
}
