import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabSensitivityResult } from './types'

export const LayananLabSensitivityResultEndpoint = '/lab-sensitivity-results'

export function useLabSensitivityResultResource() {
  return useCrudResource<LabSensitivityResult>(LayananLabSensitivityResultEndpoint)
}
