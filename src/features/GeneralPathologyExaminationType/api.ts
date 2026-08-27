import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PathologyExaminationType } from './types'

export const GeneralPathologyExaminationTypeEndpoint = '/pathology-examination-types'

export function usePathologyExaminationTypeResource() {
  return useCrudResource<PathologyExaminationType>(GeneralPathologyExaminationTypeEndpoint)
}
