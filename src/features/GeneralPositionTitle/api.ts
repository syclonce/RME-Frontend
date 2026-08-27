import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PositionTitle } from './types'

export const GeneralPositionTitleEndpoint = '/position-titles'

export function usePositionTitleResource() {
  return useCrudResource<PositionTitle>(GeneralPositionTitleEndpoint)
}
