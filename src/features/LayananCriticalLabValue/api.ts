import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { CriticalLabValue } from './types'

export const LayananCriticalLabValueEndpoint = '/critical-lab-values'

export function useCriticalLabValueResource() {
  return useCrudResource<CriticalLabValue>(LayananCriticalLabValueEndpoint)
}
