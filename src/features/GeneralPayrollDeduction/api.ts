import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PayrollDeduction } from './types'

export const GeneralPayrollDeductionEndpoint = '/payroll-deductions'

export function usePayrollDeductionResource() {
  return useCrudResource<PayrollDeduction>(GeneralPayrollDeductionEndpoint)
}
