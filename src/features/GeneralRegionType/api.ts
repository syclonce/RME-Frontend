import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RegionType } from './types'

export const GeneralRegionTypeEndpoint = '/region-types'

export function useRegionTypeResource() {
  return useCrudResource<RegionType>(GeneralRegionTypeEndpoint)
}
