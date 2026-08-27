import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PendaftaranFunction } from './types'

export const PendaftaranFunctionEndpoint = '/registration-functions'

export function usePendaftaranFunctionResource() {
  return useCrudResource<PendaftaranFunction>(PendaftaranFunctionEndpoint)
}
