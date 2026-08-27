import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Registration } from './types'

export const PendaftaranRegistrationEndpoint = '/registrations'

export function useRegistrationResource() {
  return useCrudResource<Registration>(PendaftaranRegistrationEndpoint)
}
