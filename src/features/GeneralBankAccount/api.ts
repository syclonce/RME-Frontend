import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BankAccount } from './types'

export const GeneralBankAccountEndpoint = '/bank-accounts'

export function useBankAccountResource() {
  return useCrudResource<BankAccount>(GeneralBankAccountEndpoint)
}
