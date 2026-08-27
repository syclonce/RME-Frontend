import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BedStatus } from './types'

export const GeneralBedStatusEndpoint = '/bed-statuses'

export function useBedStatusResource() {
  return useCrudResource<BedStatus>(GeneralBedStatusEndpoint)
}
