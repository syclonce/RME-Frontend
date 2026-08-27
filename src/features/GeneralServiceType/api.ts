import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ServiceType } from './types'

export const GeneralServiceTypeEndpoint = '/service-types'

export function useServiceTypeResource() {
  return useCrudResource<ServiceType>(GeneralServiceTypeEndpoint)
}
