import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BaepSensoryDetail } from './types'

export const MedicalRecordBaepSensoryDetailEndpoint = '/baep-sensory-details'

export function useBaepSensoryDetailResource() {
  return useCrudResource<BaepSensoryDetail>(MedicalRecordBaepSensoryDetailEndpoint)
}
