import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DiscountType } from './types'

export const GeneralDiscountTypeEndpoint = '/discount-types'

export function useDiscountTypeResource() {
  return useCrudResource<DiscountType>(GeneralDiscountTypeEndpoint)
}
