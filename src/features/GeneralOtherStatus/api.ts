import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { OtherStatus } from './types'

export const GeneralOtherStatusEndpoint = '/other-statuses'

export function useOtherStatusResource() {
  return useCrudResource<OtherStatus>(GeneralOtherStatusEndpoint)
}
