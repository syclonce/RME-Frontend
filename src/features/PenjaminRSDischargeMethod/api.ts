import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DischargeMethod } from './types'

export const PenjaminRSDischargeMethodEndpoint = '/discharge-methods'

export function useDischargeMethodResource() {
  return useCrudResource<DischargeMethod>(PenjaminRSDischargeMethodEndpoint)
}
