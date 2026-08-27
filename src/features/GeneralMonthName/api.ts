import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MonthName } from './types'

export const GeneralMonthNameEndpoint = '/month-names'

export function useMonthNameResource() {
  return useCrudResource<MonthName>(GeneralMonthNameEndpoint)
}
