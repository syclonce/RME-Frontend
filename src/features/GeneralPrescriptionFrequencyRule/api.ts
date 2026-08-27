import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PrescriptionFrequencyRule } from './types'

export const GeneralPrescriptionFrequencyRuleEndpoint = '/prescription-frequency-rules'

export function usePrescriptionFrequencyRuleResource() {
  return useCrudResource<PrescriptionFrequencyRule>(GeneralPrescriptionFrequencyRuleEndpoint)
}
