import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EmployeeStatus } from './types'

export const GeneralEmployeeStatusEndpoint = '/employee-statuses'

export function useEmployeeStatusResource() {
  return useCrudResource<EmployeeStatus>(GeneralEmployeeStatusEndpoint)
}
