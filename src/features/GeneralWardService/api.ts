import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { WardService } from './types'

export const GeneralWardServiceEndpoint = '/ward-services'

export function useWardServiceResource() {
  return useCrudResource<WardService>(GeneralWardServiceEndpoint)
}
