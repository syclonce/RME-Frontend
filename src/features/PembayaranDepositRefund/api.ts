import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DepositRefund } from './types'

export const PembayaranDepositRefundEndpoint = '/deposit-refunds'

export function useDepositRefundResource() {
  return useCrudResource<DepositRefund>(PembayaranDepositRefundEndpoint)
}
