import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SurgicalSafetyEvaluationResult } from './types'

export const LayananSurgicalSafetyEvaluationResultEndpoint = '/surgical-safety-evaluation-results'

export function useSurgicalSafetyEvaluationResultResource() {
  return useCrudResource<SurgicalSafetyEvaluationResult>(LayananSurgicalSafetyEvaluationResultEndpoint)
}
