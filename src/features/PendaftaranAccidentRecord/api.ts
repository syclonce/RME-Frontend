import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AccidentRecord } from './types'

export const PendaftaranAccidentRecordEndpoint = '/accidentrecords'

export function useAccidentRecordResource() {
  return useCrudResource<AccidentRecord>(PendaftaranAccidentRecordEndpoint)
}
