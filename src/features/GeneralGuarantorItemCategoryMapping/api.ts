import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GuarantorItemCategoryMapping } from './types'

export const GeneralGuarantorItemCategoryMappingEndpoint = '/guarantor-item-category-mappings'

export function useGuarantorItemCategoryMappingResource() {
  return useCrudResource<GuarantorItemCategoryMapping>(GeneralGuarantorItemCategoryMappingEndpoint)
}
