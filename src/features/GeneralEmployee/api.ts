import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Employee } from './types'

export const GeneralEmployeeEndpoint = '/employees'

export function useEmployeeResource() {
  return useCrudResource<Employee>(GeneralEmployeeEndpoint)
}
