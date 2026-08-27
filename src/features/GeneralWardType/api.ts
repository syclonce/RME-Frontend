import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { WardType } from './types'

export const GeneralWardTypeEndpoint = '/ward-types'

export function useWardTypeResource() {
  return useCrudResource<WardType>(GeneralWardTypeEndpoint)
}
