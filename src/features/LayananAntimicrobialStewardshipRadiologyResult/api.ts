import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AntimicrobialStewardshipRadiologyResult } from './types'

export const LayananAntimicrobialStewardshipRadiologyResultEndpoint = '/antimicrobial-stewardship-radiology-results'

export function useAntimicrobialStewardshipRadiologyResultResource() {
  return useCrudResource<AntimicrobialStewardshipRadiologyResult>(LayananAntimicrobialStewardshipRadiologyResultEndpoint)
}
