import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { VisitActivityStatus } from './types'

export const GeneralVisitActivityStatusEndpoint = '/visit-activity-statuses'

export function useVisitActivityStatusResource() {
  return useCrudResource<VisitActivityStatus>(GeneralVisitActivityStatusEndpoint)
}
