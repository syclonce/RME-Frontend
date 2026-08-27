import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Sale } from './types'

export const PenjualanSaleEndpoint = '/sales'

export function useSaleResource() {
  return useCrudResource<Sale>(PenjualanSaleEndpoint)
}
