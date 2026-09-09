import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeList } from '@/shared/types'
import type { ServiceHandover, ServiceHandoverFormValues } from './types'

export const PendaftaranServiceHandoverEndpoint = '/service-handovers'

export function useServiceHandoverResource() {
  return useCrudResource<ServiceHandover>(PendaftaranServiceHandoverEndpoint)
}

export function useVisitServiceHandovers(visitId: number | null) {
  return useQuery({
    queryKey: [PendaftaranServiceHandoverEndpoint, 'visit', visitId],
    enabled: visitId !== null && visitId > 0,
    queryFn: async () => {
      const res = await apiClient.get(PendaftaranServiceHandoverEndpoint, {
        params: { visit_id: visitId, per_page: 50 },
      })
      return normalizeList<ServiceHandover>(res.data).items.sort((a, b) => b.id - a.id)
    },
  })
}

export function useCreateServiceHandover(visitId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: ServiceHandoverFormValues) => {
      const res = await apiClient.post(PendaftaranServiceHandoverEndpoint, { ...values, visit_id: visitId })
      return res.data?.data ?? res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PendaftaranServiceHandoverEndpoint, 'visit', visitId] })
    },
  })
}
