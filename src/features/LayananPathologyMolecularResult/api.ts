import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PathologyMolecularResult } from './types'

export const LayananPathologyMolecularResultEndpoint = '/pathology-molecular-results'

export function usePathologyMolecularResultResource() {
  return useCrudResource<PathologyMolecularResult>(LayananPathologyMolecularResultEndpoint)
}
