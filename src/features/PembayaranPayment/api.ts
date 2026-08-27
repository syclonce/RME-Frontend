import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Payment } from './types'

export const PembayaranPaymentEndpoint = '/payments'

export function usePaymentResource() {
  return useCrudResource<Payment>(PembayaranPaymentEndpoint)
}
