import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { IllnessProgressionHistory } from './types'

export const MedicalRecordIllnessProgressionHistoryEndpoint = '/illness-progression-histories'

export function useIllnessProgressionHistoryResource() {
  return useCrudResource<IllnessProgressionHistory>(MedicalRecordIllnessProgressionHistoryEndpoint)
}
