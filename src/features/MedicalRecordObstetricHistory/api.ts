import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ObstetricHistory } from './types'

export const MedicalRecordObstetricHistoryEndpoint = '/obstetric-histories'

export function useObstetricHistoryResource() {
  return useCrudResource<ObstetricHistory>(MedicalRecordObstetricHistoryEndpoint)
}
