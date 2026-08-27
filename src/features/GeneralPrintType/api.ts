import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PrintType } from './types'

export const GeneralPrintTypeEndpoint = '/print-types'

export function usePrintTypeResource() {
  return useCrudResource<PrintType>(GeneralPrintTypeEndpoint)
}
