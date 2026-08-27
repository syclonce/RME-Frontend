import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Invoice } from './types'

export const InvoiceEndpoint = '/invoices'

export function useInvoiceResource() {
  const resource = useCrudResource<Invoice>(InvoiceEndpoint)
  const queryClient = useQueryClient()

  const lock = useMutation({
    mutationFn: async (id: number) => apiClient.post(`${InvoiceEndpoint}/${id}/lock`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [InvoiceEndpoint] }),
  })

  const unlock = useMutation({
    mutationFn: async (id: number) => apiClient.post(`${InvoiceEndpoint}/${id}/unlock`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [InvoiceEndpoint] }),
  })

  return { ...resource, lock, unlock }
}
