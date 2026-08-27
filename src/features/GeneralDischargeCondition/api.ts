import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DischargeCondition } from './types'

export const GeneralDischargeConditionEndpoint = '/discharge-conditions'

export function useDischargeConditionResource() {
  return useCrudResource<DischargeCondition>(GeneralDischargeConditionEndpoint)
}
