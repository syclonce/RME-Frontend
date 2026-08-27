import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PaymentTransactionType } from './types'

export const GeneralPaymentTransactionTypeEndpoint = '/payment-transaction-types'

export function usePaymentTransactionTypeResource() {
  return useCrudResource<PaymentTransactionType>(GeneralPaymentTransactionTypeEndpoint)
}
