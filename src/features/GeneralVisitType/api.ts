import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { VisitType } from './types'

export const GeneralVisitTypeEndpoint = '/visit-types'

export function useVisitTypeResource() {
  return useCrudResource<VisitType>(GeneralVisitTypeEndpoint)
}
