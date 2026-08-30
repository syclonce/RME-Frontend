import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { QualityIndicator, QualityIndicatorRecord } from './types'

export const AuditQualityIndicatorEndpoint = '/quality-indicators'
export const QualityIndicatorRecordEndpoint = '/quality-indicator-records'

export function useQualityIndicatorResource() {
  return useCrudResource<QualityIndicator>(AuditQualityIndicatorEndpoint)
}

export function useQualityIndicatorRecordResource() {
  return useCrudResource<QualityIndicatorRecord>(QualityIndicatorRecordEndpoint)
}
