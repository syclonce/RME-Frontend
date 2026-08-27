import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ExaminationGroup } from './types'

export const GeneralExaminationGroupEndpoint = '/examination-groups'

export function useExaminationGroupResource() {
  return useCrudResource<ExaminationGroup>(GeneralExaminationGroupEndpoint)
}
