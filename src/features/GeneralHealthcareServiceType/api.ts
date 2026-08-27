import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { HealthcareServiceType } from './types'

export const GeneralHealthcareServiceTypeEndpoint = '/healthcare-service-types'

export function useHealthcareServiceTypeResource() {
  return useCrudResource<HealthcareServiceType>(GeneralHealthcareServiceTypeEndpoint)
}
