import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabPcrResult } from './types'

export const LayananLabPcrResultEndpoint = '/lab-pcr-results'

export function useLabPcrResultResource() {
  return useCrudResource<LabPcrResult>(LayananLabPcrResultEndpoint)
}
