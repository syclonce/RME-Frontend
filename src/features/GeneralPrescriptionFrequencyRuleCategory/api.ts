import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PrescriptionFrequencyRuleCategory } from './types'

export const GeneralPrescriptionFrequencyRuleCategoryEndpoint = '/prescription-frequency-rule-categories'

export function usePrescriptionFrequencyRuleCategoryResource() {
  return useCrudResource<PrescriptionFrequencyRuleCategory>(GeneralPrescriptionFrequencyRuleCategoryEndpoint)
}
