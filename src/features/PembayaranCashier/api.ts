import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Cashier } from './types'

export const PembayaranCashierEndpoint = '/cashiers'

export function useCashierResource() {
  return useCrudResource<Cashier>(PembayaranCashierEndpoint)
}
