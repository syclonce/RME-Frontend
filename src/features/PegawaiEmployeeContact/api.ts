import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EmployeeContact } from './types'

export const PegawaiEmployeeContactEndpoint = '/employee-contacts'

export function useEmployeeContactResource() {
  return useCrudResource<EmployeeContact>(PegawaiEmployeeContactEndpoint)
}
