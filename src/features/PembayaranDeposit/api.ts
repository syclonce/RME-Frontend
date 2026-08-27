import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Deposit } from './types'

export const PembayaranDepositEndpoint = '/deposits'

export function useDepositResource() {
  return useCrudResource<Deposit>(PembayaranDepositEndpoint)
}
