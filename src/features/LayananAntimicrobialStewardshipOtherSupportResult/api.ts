import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AntimicrobialStewardshipOtherSupportResult } from './types'

export const LayananAntimicrobialStewardshipOtherSupportResultEndpoint = '/antimicrobial-stewardship-other-support-results'

export function useAntimicrobialStewardshipOtherSupportResultResource() {
  return useCrudResource<AntimicrobialStewardshipOtherSupportResult>(LayananAntimicrobialStewardshipOtherSupportResultEndpoint)
}
