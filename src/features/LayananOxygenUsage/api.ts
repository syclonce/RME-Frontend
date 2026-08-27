import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { OxygenUsage } from './types'

export const LayananOxygenUsageEndpoint = '/oxygen-usages'

export function useOxygenUsageResource() {
  return useCrudResource<OxygenUsage>(LayananOxygenUsageEndpoint)
}
