import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { QualityIndicator } from './types'

export const AuditQualityIndicatorEndpoint = '/quality-indicators'

export function useQualityIndicatorResource() {
  return useCrudResource<QualityIndicator>(AuditQualityIndicatorEndpoint)
}
