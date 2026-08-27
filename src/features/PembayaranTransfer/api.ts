import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Transfer } from './types'

export const PembayaranTransferEndpoint = '/bank-transfers'

export function useTransferResource() {
  return useCrudResource<Transfer>(PembayaranTransferEndpoint)
}
