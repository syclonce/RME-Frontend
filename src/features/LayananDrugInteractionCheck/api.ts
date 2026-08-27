import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DrugInteractionRule } from './types'

export const LayananDrugInteractionCheckEndpoint = '/drug-interaction-rules'

export function useDrugInteractionRuleResource() {
  return useCrudResource<DrugInteractionRule>(LayananDrugInteractionCheckEndpoint)
}
