import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { CoManagement } from './types'

export const PendaftaranCoManagementEndpoint = '/comanagements'

export function useCoManagementResource() {
  return useCrudResource<CoManagement>(PendaftaranCoManagementEndpoint)
}
