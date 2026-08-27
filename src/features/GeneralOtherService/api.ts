import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { OtherService } from './types'

export const GeneralOtherServiceEndpoint = '/other-services'

export function useOtherServiceResource() {
  return useCrudResource<OtherService>(GeneralOtherServiceEndpoint)
}
