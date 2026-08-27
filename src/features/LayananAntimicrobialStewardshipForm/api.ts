import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AntimicrobialStewardshipForm } from './types'

export const LayananAntimicrobialStewardshipFormEndpoint = '/antimicrobial-stewardship-forms'

export function useAntimicrobialStewardshipFormResource() {
  return useCrudResource<AntimicrobialStewardshipForm>(LayananAntimicrobialStewardshipFormEndpoint)
}
