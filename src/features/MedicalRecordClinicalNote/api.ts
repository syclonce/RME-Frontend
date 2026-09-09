import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import { normalizeList } from '@/shared/types'
import type { ClinicalNote, ClinicalNoteFormValues } from './types'

export const MedicalRecordClinicalNoteEndpoint = '/clinical-notes'

export function useClinicalNoteResource() {
  return useCrudResource<ClinicalNote>(MedicalRecordClinicalNoteEndpoint)
}

/** Catatan klinis satu kunjungan, terbaru di atas. */
export function useVisitClinicalNotes(visitId: number | null) {
  return useQuery({
    queryKey: [MedicalRecordClinicalNoteEndpoint, 'visit', visitId],
    enabled: visitId !== null && visitId > 0,
    queryFn: async () => {
      const res = await apiClient.get(MedicalRecordClinicalNoteEndpoint, {
        params: { visit_id: visitId, per_page: 50 },
      })
      return normalizeList<ClinicalNote>(res.data).items.sort((a, b) => {
        const at = a.recorded_at ? new Date(a.recorded_at).getTime() : 0
        const bt = b.recorded_at ? new Date(b.recorded_at).getTime() : 0
        return bt - at
      })
    },
  })
}

export function useRecordClinicalNote(visitId: number | null) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: ClinicalNoteFormValues) => {
      const res = await apiClient.post(MedicalRecordClinicalNoteEndpoint, { ...values, visit_id: visitId })
      return res.data?.data ?? res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MedicalRecordClinicalNoteEndpoint, 'visit', visitId] })
    },
  })
}
