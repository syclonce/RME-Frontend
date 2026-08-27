import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Quarter } from './types'

export const GeneralQuarterEndpoint = '/quarters'

export function useQuarterResource() {
  return useCrudResource<Quarter>(GeneralQuarterEndpoint)
}
