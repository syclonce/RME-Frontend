import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AntimicrobialStewardshipMicrobiologyResult } from './types'

export const LayananAntimicrobialStewardshipMicrobiologyResultEndpoint = '/antimicrobial-stewardship-microbiology-results'

export function useAntimicrobialStewardshipMicrobiologyResultResource() {
  return useCrudResource<AntimicrobialStewardshipMicrobiologyResult>(LayananAntimicrobialStewardshipMicrobiologyResultEndpoint)
}
