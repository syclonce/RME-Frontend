import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabExaminationResult } from './types'

export const LayananLabExaminationResultEndpoint = '/lab-examination-results'

export function useLabExaminationResultResource() {
  return useCrudResource<LabExaminationResult>(LayananLabExaminationResultEndpoint)
}
