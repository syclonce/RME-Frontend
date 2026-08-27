import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EmploymentStatus } from './types'

export const GeneralEmploymentStatusEndpoint = '/employment-statuses'

export function useEmploymentStatusResource() {
  return useCrudResource<EmploymentStatus>(GeneralEmploymentStatusEndpoint)
}
