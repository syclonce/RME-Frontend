import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Ward } from './types'

export const GeneralWardEndpoint = '/wards'

export function useWardResource() {
  return useCrudResource<Ward>(GeneralWardEndpoint)
}
