import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DepositType } from './types'

export const GeneralDepositTypeEndpoint = '/deposit-types'

export function useDepositTypeResource() {
  return useCrudResource<DepositType>(GeneralDepositTypeEndpoint)
}
