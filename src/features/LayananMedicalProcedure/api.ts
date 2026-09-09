import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeList } from '@/shared/types'
import type { MedicalProcedure, MedicalProcedureFormValues } from './types'

export const LayananMedicalProcedureEndpoint = '/medical-procedures'

export function useMedicalProcedureResource() {
  return useCrudResource<MedicalProcedure>(LayananMedicalProcedureEndpoint)
}

/** Daftar milik satu kunjungan, terbaru di atas. */
export function useVisitMedicalProcedures(visitId: number | null) {
  return useQuery({
    queryKey: [LayananMedicalProcedureEndpoint, 'visit', visitId],
    enabled: visitId !== null && visitId > 0,
    queryFn: async () => {
      const res = await apiClient.get(LayananMedicalProcedureEndpoint, {
        params: { visit_id: visitId, per_page: 50 },
      })
      return normalizeList<MedicalProcedure>(res.data).items.sort((a, b) => b.id - a.id)
    },
  })
}

export function useCreateMedicalProcedure(visitId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: MedicalProcedureFormValues) => {
      const res = await apiClient.post(LayananMedicalProcedureEndpoint, { ...values, visit_id: visitId })
      return res.data?.data ?? res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LayananMedicalProcedureEndpoint, 'visit', visitId] })
    },
  })
}
