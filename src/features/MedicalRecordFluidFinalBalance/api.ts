import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FluidFinalBalance } from './types'

export const MedicalRecordFluidFinalBalanceEndpoint = '/fluid-final-balances'

export function useFluidFinalBalanceResource() {
  return useCrudResource<FluidFinalBalance>(MedicalRecordFluidFinalBalanceEndpoint)
}
