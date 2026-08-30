import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeList } from '@/shared/types'
import type { PrintDocument } from './types'

export const PrintDocumentEndpoint = '/print-documents'

export function usePrintDocumentResource() {
  const queryClient = useQueryClient()

  const useList = () =>
    useQuery({
      queryKey: [PrintDocumentEndpoint],
      queryFn: async () => {
        const res = await apiClient.get(PrintDocumentEndpoint)
        return normalizeList<PrintDocument>(res.data)
      },
    })

  const useDetail = (id: number | null) =>
    useQuery({
      queryKey: [PrintDocumentEndpoint, id],
      queryFn: async () => {
        const res = await apiClient.get(`${PrintDocumentEndpoint}/${id}`)
        return (res.data?.data ?? res.data) as PrintDocument
      },
      enabled: id !== null,
    })

  const issue = useMutation({
    mutationFn: async (payload: { document_type: string; ref_type: string; ref_id: number }) => {
      const res = await apiClient.post(`${PrintDocumentEndpoint}/issue`, payload)
      return res.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PrintDocumentEndpoint] }),
  })

  return { useList, useDetail, issue }
}
