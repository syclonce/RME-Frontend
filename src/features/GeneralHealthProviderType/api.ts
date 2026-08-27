import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { HealthProviderType } from './types'

export const GeneralHealthProviderTypeEndpoint = '/health-provider-types'

export function useHealthProviderTypeResource() {
  return useCrudResource<HealthProviderType>(GeneralHealthProviderTypeEndpoint)
}
