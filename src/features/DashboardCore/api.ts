import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import type { DashboardCore } from './types'

export const DashboardCoreEndpoint = '/dashboard/core'

export function useDashboardCore(date?: string) {
  return useQuery({
    queryKey: [DashboardCoreEndpoint, date ?? 'today'],
    queryFn: async () => {
      const res = await apiClient.get(DashboardCoreEndpoint, { params: date ? { date } : undefined })
      return (res.data?.data ?? res.data) as DashboardCore
    },
    staleTime: 30_000,
    refetchInterval: 60_000,
  })
}
