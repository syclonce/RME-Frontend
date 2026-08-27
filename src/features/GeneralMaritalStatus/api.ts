import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MaritalStatus } from './types'

export const GeneralMaritalStatusEndpoint = '/marital_statuses'

export function useMaritalStatusResource() {
  return useCrudResource<MaritalStatus>(GeneralMaritalStatusEndpoint)
}
