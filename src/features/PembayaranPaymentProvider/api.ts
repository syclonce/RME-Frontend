import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PaymentProvider } from './types'

export const PembayaranPaymentProviderEndpoint = '/payment-providers'

export function usePaymentProviderResource() {
  return useCrudResource<PaymentProvider>(PembayaranPaymentProviderEndpoint)
}
