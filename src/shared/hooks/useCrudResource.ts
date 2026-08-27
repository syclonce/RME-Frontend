import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeItem, normalizeList } from '@/shared/types'

/**
 * Hook generik untuk modul "CRUD sederhana + picker" (bentuk #1 dari
 * taksonomi 10-bentuk — mayoritas mutlak modul RME-Backend). Modul dengan
 * bentuk lain (append-only, workflow status, nested-list, dst) TIDAK pakai
 * hook ini — akan dapat hook/komponen sendiri per bentuk.
 */
export function useCrudResource<T extends { id: number | string }>(endpoint: string) {
  const queryClient = useQueryClient()
  const listKey = [endpoint, 'list']

  const list = (params?: Record<string, unknown>) =>
    useQuery({
      queryKey: [...listKey, params],
      queryFn: async () => {
        const res = await apiClient.get(endpoint, { params })
        return normalizeList<T>(res.data)
      },
    })

  const detail = (id: T['id'] | undefined) =>
    useQuery({
      queryKey: [endpoint, 'detail', id],
      queryFn: async () => {
        const res = await apiClient.get(`${endpoint}/${id}`)
        return normalizeItem<T>(res.data)
      },
      enabled: id !== undefined,
    })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: [endpoint] })

  const create = useMutation({
    mutationFn: async (payload: Partial<T>) => {
      const res = await apiClient.post(endpoint, payload)
      return normalizeItem<T>(res.data)
    },
    onSuccess: invalidate,
  })

  const update = useMutation({
    mutationFn: async ({ id, payload }: { id: T['id']; payload: Partial<T> }) => {
      const res = await apiClient.put(`${endpoint}/${id}`, payload)
      return normalizeItem<T>(res.data)
    },
    onSuccess: invalidate,
  })

  const remove = useMutation({
    mutationFn: async (id: T['id']) => {
      await apiClient.delete(`${endpoint}/${id}`)
    },
    onSuccess: invalidate,
  })

  return { list, detail, create, update, remove }
}
