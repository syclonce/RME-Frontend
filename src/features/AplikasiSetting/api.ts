import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import type { SettingsMap } from './types'

export const SettingsEndpoint = '/settings'

export function useSettingsResource() {
  const queryClient = useQueryClient()

  const useList = () =>
    useQuery({
      queryKey: [SettingsEndpoint],
      queryFn: async () => {
        const res = await apiClient.get<{ data: SettingsMap }>(SettingsEndpoint)
        return res.data.data
      },
    })

  const invalidate = () => queryClient.invalidateQueries({ queryKey: [SettingsEndpoint] })

  const create = useMutation({
    mutationFn: async (payload: { key: string; value: unknown; type?: string; description?: string }) => {
      const res = await apiClient.post(SettingsEndpoint, payload)
      return res.data
    },
    onSuccess: invalidate,
  })

  const update = useMutation({
    mutationFn: async ({ key, payload }: { key: string; payload: { value: unknown; type?: string; description?: string } }) => {
      const res = await apiClient.put(`${SettingsEndpoint}/${key}`, payload)
      return res.data
    },
    onSuccess: invalidate,
  })

  return { useList, create, update }
}
