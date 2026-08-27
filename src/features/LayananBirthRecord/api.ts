import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BirthRecord } from './types'

export const LayananBirthRecordEndpoint = '/birth-records'

export function useBirthRecordResource() {
  return useCrudResource<BirthRecord>(LayananBirthRecordEndpoint)
}
