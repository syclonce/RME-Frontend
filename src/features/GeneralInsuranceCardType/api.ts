import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InsuranceCardType } from './types'

export const GeneralInsuranceCardTypeEndpoint = '/insurance-card-types'

export function useInsuranceCardTypeResource() {
  return useCrudResource<InsuranceCardType>(GeneralInsuranceCardTypeEndpoint)
}
