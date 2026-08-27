import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { VisitDateChange } from './types'

export const PendaftaranVisitDateChangeEndpoint = '/visitdatechanges'

export function useVisitDateChangeResource() {
  return useCrudResource<VisitDateChange>(PendaftaranVisitDateChangeEndpoint)
}
