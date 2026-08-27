import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GynecologyHistory } from './types'

export const MedicalRecordGynecologyHistoryEndpoint = '/gynecology-histories'

export function useGynecologyHistoryResource() {
  return useCrudResource<GynecologyHistory>(MedicalRecordGynecologyHistoryEndpoint)
}
