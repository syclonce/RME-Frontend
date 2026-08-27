import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AntimicrobialStewardshipPriorHistory } from './types'

export const LayananAntimicrobialStewardshipPriorHistoryEndpoint = '/antimicrobial-stewardship-prior-histories'

export function useAntimicrobialStewardshipPriorHistoryResource() {
  return useCrudResource<AntimicrobialStewardshipPriorHistory>(LayananAntimicrobialStewardshipPriorHistoryEndpoint)
}
