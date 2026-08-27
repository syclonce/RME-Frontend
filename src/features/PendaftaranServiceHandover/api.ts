import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ServiceHandover } from './types'

export const PendaftaranServiceHandoverEndpoint = '/service-handovers'

export function useServiceHandoverResource() {
  return useCrudResource<ServiceHandover>(PendaftaranServiceHandoverEndpoint)
}
