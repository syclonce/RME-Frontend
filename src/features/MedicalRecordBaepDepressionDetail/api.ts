import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BaepDepressionDetail } from './types'

export const MedicalRecordBaepDepressionDetailEndpoint = '/baep-depression-details'

export function useBaepDepressionDetailResource() {
  return useCrudResource<BaepDepressionDetail>(MedicalRecordBaepDepressionDetailEndpoint)
}
