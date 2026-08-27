import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { CashierTransaction } from './types'

export const PembayaranCashierTransactionEndpoint = '/cashier-transactions'

export function useCashierTransactionResource() {
  return useCrudResource<CashierTransaction>(PembayaranCashierTransactionEndpoint)
}
