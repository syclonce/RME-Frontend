import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { VisitStatus } from './types'

export const GeneralVisitStatusEndpoint = '/visit-statuses'

export function useVisitStatusResource() {
  return useCrudResource<VisitStatus>(GeneralVisitStatusEndpoint)
}
