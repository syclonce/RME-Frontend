import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeList } from '@/shared/types'
import type { Diagnosis, DiagnosisFormValues } from './types'

export const MedicalRecordDiagnosisEndpoint = '/diagnoses'

export function useDiagnosisResource() {
  return useCrudResource<Diagnosis>(MedicalRecordDiagnosisEndpoint)
}

export function useVisitDiagnoses(visitId: number | null) {
  return useQuery({
    queryKey: [MedicalRecordDiagnosisEndpoint, 'visit', visitId],
    enabled: visitId !== null && visitId > 0,
    queryFn: async () => {
      const res = await apiClient.get(MedicalRecordDiagnosisEndpoint, {
        params: { visit_id: visitId, per_page: 50 },
      })
      // Diagnosis utama selalu di atas: ia yang menentukan grouping INA-CBG,
      // dan dokter memeriksanya lebih dulu sebelum diagnosis sekunder.
      return normalizeList<Diagnosis>(res.data).items.sort((a, b) => {
        if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1
        return b.id - a.id
      })
    },
  })
}

export function useRecordDiagnosis(visitId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: DiagnosisFormValues) => {
      const res = await apiClient.post(MedicalRecordDiagnosisEndpoint, { ...values, visit_id: visitId })
      return res.data?.data ?? res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MedicalRecordDiagnosisEndpoint, 'visit', visitId] })
    },
  })
}
