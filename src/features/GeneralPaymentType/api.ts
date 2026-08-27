import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PaymentType } from './types'

export const GeneralPaymentTypeEndpoint = '/payment-types'

export function usePaymentTypeResource() {
  return useCrudResource<PaymentType>(GeneralPaymentTypeEndpoint)
}
