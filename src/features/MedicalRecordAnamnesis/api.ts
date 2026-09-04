import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeList } from '@/shared/types'
import type { Anamnesis, AnamnesisFormValues } from './types'

export const MedicalRecordAnamnesisEndpoint = '/anamneses'

export function useAnamnesisResource() {
  return useCrudResource<Anamnesis>(MedicalRecordAnamnesisEndpoint)
}

export function useVisitAnamneses(visitId: number | null) {
  return useQuery({
    queryKey: [MedicalRecordAnamnesisEndpoint, 'visit', visitId],
    enabled: visitId !== null && visitId > 0,
    queryFn: async () => {
      const res = await apiClient.get(MedicalRecordAnamnesisEndpoint, {
        params: { visit_id: visitId, per_page: 50 },
      })
      return normalizeList<Anamnesis>(res.data).items.sort((a, b) => {
        const at = a.recorded_at ? new Date(a.recorded_at).getTime() : 0
        const bt = b.recorded_at ? new Date(b.recorded_at).getTime() : 0
        return bt - at
      })
    },
  })
}

export function useRecordAnamnesis(visitId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: AnamnesisFormValues) => {
      const res = await apiClient.post(MedicalRecordAnamnesisEndpoint, { ...values, visit_id: visitId })
      return res.data?.data ?? res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MedicalRecordAnamnesisEndpoint, 'visit', visitId] })
    },
  })
}
