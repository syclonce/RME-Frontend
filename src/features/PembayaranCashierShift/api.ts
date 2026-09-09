import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { normalizeList } from '@/shared/types'
import type { CashierShift } from './types'

export const PembayaranCashierShiftEndpoint = '/cashier-shifts'

const KEY = [PembayaranCashierShiftEndpoint]

export function useCashierShifts() {
  return useQuery({
    queryKey: KEY,
    queryFn: async () => {
      const res = await apiClient.get(PembayaranCashierShiftEndpoint, { params: { per_page: 50 } })
      return normalizeList<CashierShift>(res.data).items.sort((a, b) => b.id - a.id)
    },
  })
}

/** Buka shift: endpointnya di bawah kasir, bukan di bawah shift. */
export function useOpenCashierShift() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ cashierId, initialCash }: { cashierId: number; initialCash: number }) => {
      const res = await apiClient.post(`/cashiers/${cashierId}/shifts/open`, { initial_cash: initialCash })
      return (res.data?.data ?? res.data) as CashierShift
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}

export function useCloseCashierShift() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ shiftId, actualCash, notes }: { shiftId: number; actualCash: number; notes?: string }) => {
      const res = await apiClient.post(`${PembayaranCashierShiftEndpoint}/${shiftId}/close`, {
        actual_cash: actualCash,
        ...(notes ? { notes } : {}),
      })
      return (res.data?.data ?? res.data) as CashierShift
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: KEY }),
  })
}
