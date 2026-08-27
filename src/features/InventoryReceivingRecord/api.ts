import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReceivingRecord } from './types'

export const InventoryReceivingRecordEndpoint = '/receiving-records'

export function useReceivingRecordResource() {
  return useCrudResource<ReceivingRecord>(InventoryReceivingRecordEndpoint)
}
