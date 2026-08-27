import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AntimicrobialStewardshipFormItem } from './types'

export const LayananAntimicrobialStewardshipFormItemEndpoint = '/antimicrobial-stewardship-form-items'

export function useAntimicrobialStewardshipFormItemResource() {
  return useCrudResource<AntimicrobialStewardshipFormItem>(LayananAntimicrobialStewardshipFormItemEndpoint)
}
