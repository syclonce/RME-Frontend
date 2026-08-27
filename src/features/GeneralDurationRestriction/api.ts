import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DurationRestriction } from './types'

export const GeneralDurationRestrictionEndpoint = '/duration-restrictions'

export function useDurationRestrictionResource() {
  return useCrudResource<DurationRestriction>(GeneralDurationRestrictionEndpoint)
}
