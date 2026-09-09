import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/api/client'
import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Payment } from './types'

export const PembayaranPaymentEndpoint = '/payments'

export function usePaymentResource() {
  return useCrudResource<Payment>(PembayaranPaymentEndpoint)
}

/**
 * Batalkan pembayaran.
 *
 * Menuntut shift kasir yang MASIH TERBUKA — bukan shift asal pembayaran itu.
 * Backend menolak shift tertutup ("Shift kasir sudah ditutup."), karena
 * pembatalan mengubah kas yang sudah dihitung dan diserahterimakan.
 */
export function useReversePayment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, cashierShiftId, reason }: { id: number; cashierShiftId: number; reason: string }) => {
      const res = await apiClient.post(`${PembayaranPaymentEndpoint}/${id}/reverse`, {
        cashier_shift_id: cashierShiftId,
        reason,
      })
      return res.data?.data ?? res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PembayaranPaymentEndpoint] })
      queryClient.invalidateQueries({ queryKey: ['/cashier-shifts'] })
    },
  })
}
