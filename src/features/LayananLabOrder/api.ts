import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeList } from '@/shared/types'
import type { LabOrder, LabOrderFormValues } from './types'

export const LayananLabOrderEndpoint = '/lab-orders'

export function useLabOrderResource() {
  return useCrudResource<LabOrder>(LayananLabOrderEndpoint)
}

/** Daftar milik satu kunjungan, terbaru di atas. */
export function useVisitLabOrders(visitId: number | null) {
  return useQuery({
    queryKey: [LayananLabOrderEndpoint, 'visit', visitId],
    enabled: visitId !== null && visitId > 0,
    queryFn: async () => {
      const res = await apiClient.get(LayananLabOrderEndpoint, {
        params: { visit_id: visitId, per_page: 50 },
      })
      return normalizeList<LabOrder>(res.data).items.sort((a, b) => b.id - a.id)
    },
  })
}

export function useCreateLabOrder(visitId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: LabOrderFormValues) => {
      const res = await apiClient.post(LayananLabOrderEndpoint, { ...values, visit_id: visitId })
      return res.data?.data ?? res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LayananLabOrderEndpoint, 'visit', visitId] })
    },
  })
}
