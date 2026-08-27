import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Discount } from './types'

export const PembayaranDiscountEndpoint = '/discounts'

export function useDiscountResource() {
  return useCrudResource<Discount>(PembayaranDiscountEndpoint)
}
