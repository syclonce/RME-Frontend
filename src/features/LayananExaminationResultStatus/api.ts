import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ExaminationResultStatus } from './types'

export const LayananExaminationResultStatusEndpoint = '/examination-result-statuses'

export function useExaminationResultStatusResource() {
  return useCrudResource<ExaminationResultStatus>(LayananExaminationResultStatusEndpoint)
}
