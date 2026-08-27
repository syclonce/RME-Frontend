import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AntimicrobialStewardshipLabResult } from './types'

export const LayananAntimicrobialStewardshipLabResultEndpoint = '/antimicrobial-stewardship-lab-results'

export function useAntimicrobialStewardshipLabResultResource() {
  return useCrudResource<AntimicrobialStewardshipLabResult>(LayananAntimicrobialStewardshipLabResultEndpoint)
}
