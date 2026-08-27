import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Bank } from './types'

export const GeneralBankEndpoint = '/banks'

export function useBankResource() {
  return useCrudResource<Bank>(GeneralBankEndpoint)
}
