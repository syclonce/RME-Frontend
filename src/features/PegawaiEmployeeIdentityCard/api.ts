import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EmployeeIdentityCard } from './types'

export const PegawaiEmployeeIdentityCardEndpoint = '/employee-identity-cards'

export function useEmployeeIdentityCardResource() {
  return useCrudResource<EmployeeIdentityCard>(PegawaiEmployeeIdentityCardEndpoint)
}
