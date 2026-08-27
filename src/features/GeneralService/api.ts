import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Service } from './types'

export const GeneralServiceEndpoint = '/services'

export function useServiceResource() {
  return useCrudResource<Service>(GeneralServiceEndpoint)
}
