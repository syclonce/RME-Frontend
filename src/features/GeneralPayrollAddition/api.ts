import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PayrollAddition } from './types'

export const GeneralPayrollAdditionEndpoint = '/payroll-additions'

export function usePayrollAdditionResource() {
  return useCrudResource<PayrollAddition>(GeneralPayrollAdditionEndpoint)
}
