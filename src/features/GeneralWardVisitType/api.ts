import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { WardVisitType } from './types'

export const GeneralWardVisitTypeEndpoint = '/ward-visit-types'

export function useWardVisitTypeResource() {
  return useCrudResource<WardVisitType>(GeneralWardVisitTypeEndpoint)
}
