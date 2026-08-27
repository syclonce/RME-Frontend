import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { OtherHistory } from './types'

export const MedicalRecordOtherHistoryEndpoint = '/other-histories'

export function useOtherHistoryResource() {
  return useCrudResource<OtherHistory>(MedicalRecordOtherHistoryEndpoint)
}
