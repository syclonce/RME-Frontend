import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MortuaryRecord } from './types'

export const LayananMortuaryRecordEndpoint = '/mortuary-records'

export function useMortuaryRecordResource() {
  return useCrudResource<MortuaryRecord>(LayananMortuaryRecordEndpoint)
}
