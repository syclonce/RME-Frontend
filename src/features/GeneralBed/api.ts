import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Bed } from './types'

export const GeneralBedEndpoint = '/beds'

export function useBedResource() {
  return useCrudResource<Bed>(GeneralBedEndpoint)
}
